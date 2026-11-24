(function(global) {
    "use strict";
    var EXP = new Uint8Array(512), LOG = new Uint8Array(256);
    (function() {
        var x = 1;
        for (var i = 0; i < 255; i++) {
            EXP[i] = x;
            LOG[x] = i;
            x <<= 1;
            if (x & 0x100) x ^= 0x11D;
        }
        for (var j = 255; j < 512; j++) EXP[j] = EXP[j - 255];
    })();
    function gfMul(a, b) {
        if (a === 0 || b === 0) return 0;
        return EXP[LOG[a] + LOG[b]];
    }
    function rsGenerator(n) {
        var poly = [ 1 ];
        for (var i = 0; i < n; i++) {
            var next = new Array(poly.length + 1).fill(0);
            for (var j = 0; j < poly.length; j++) {
                next[j] ^= poly[j];
                next[j + 1] ^= gfMul(poly[j], EXP[i]);
            }
            poly = next;
        }
        return poly;
    }
    function rsEncode(data, ecLen) {
        var gen = rsGenerator(ecLen);
        var res = new Array(ecLen).fill(0);
        for (var i = 0; i < data.length; i++) {
            var factor = data[i] ^ res[0];
            res.shift();
            res.push(0);
            for (var j = 0; j < ecLen; j++) res[j] ^= gfMul(gen[j + 1], factor);
        }
        return res;
    }
    var RS_M = {
        1: [ 10, 1, 16, 0, 0 ],
        2: [ 16, 1, 28, 0, 0 ],
        3: [ 26, 1, 44, 0, 0 ],
        4: [ 18, 2, 32, 0, 0 ],
        5: [ 24, 2, 43, 0, 0 ],
        6: [ 16, 4, 27, 0, 0 ],
        7: [ 18, 4, 31, 0, 0 ],
        8: [ 22, 2, 38, 2, 39 ],
        9: [ 22, 3, 36, 2, 37 ],
        10: [ 26, 4, 43, 1, 44 ]
    };
    var ALIGN = {
        1: [],
        2: [ 6, 18 ],
        3: [ 6, 22 ],
        4: [ 6, 26 ],
        5: [ 6, 30 ],
        6: [ 6, 34 ],
        7: [ 6, 22, 38 ],
        8: [ 6, 24, 42 ],
        9: [ 6, 26, 46 ],
        10: [ 6, 28, 50 ]
    };
    function dataCapacity(ver) {
        var t = RS_M[ver];
        return t[1] * t[2] + t[3] * t[4];
    }
    function bchDigit(data) {
        var d = 0;
        while (data !== 0) {
            d++;
            data >>>= 1;
        }
        return d;
    }
    function bch(data, poly, len) {
        var d = data << bchDigit(poly) - 1;
        while (bchDigit(d) - bchDigit(poly) >= 0) {
            d ^= poly << bchDigit(d) - bchDigit(poly);
        }
        return data << len - 1 | d;
    }
    function formatInfo(mask) {
        return bch(0 << 3 | mask, 0x537, 11) ^ 0x5412;
    }
    function versionInfo(ver) {
        return bch(ver, 0x1F25, 13);
    }
    var MASKS = [ function(i, j) {
        return (i + j) % 2 === 0;
    }, function(i) {
        return i % 2 === 0;
    }, function(i, j) {
        return j % 3 === 0;
    }, function(i, j) {
        return (i + j) % 3 === 0;
    }, function(i, j) {
        return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0;
    }, function(i, j) {
        return i * j % 2 + i * j % 3 === 0;
    }, function(i, j) {
        return (i * j % 2 + i * j % 3) % 2 === 0;
    }, function(i, j) {
        return ((i + j) % 2 + i * j % 3) % 2 === 0;
    } ];
    function makeMatrix(size) {
        var m = [];
        for (var i = 0; i < size; i++) m.push(new Array(size).fill(null));
        return m;
    }
    function placeFinder(m, row, col) {
        for (var r = -1; r <= 7; r++) {
            for (var c = -1; c <= 7; c++) {
                var rr = row + r, cc = col + c;
                if (rr < 0 || rr >= m.length || cc < 0 || cc >= m.length) continue;
                var on = r >= 0 && r <= 6 && (c === 0 || c === 6) || c >= 0 && c <= 6 && (r === 0 || r === 6) || r >= 2 && r <= 4 && c >= 2 && c <= 4;
                m[rr][cc] = on;
            }
        }
    }
    function placeAlignment(m, ver) {
        var pos = ALIGN[ver], size = m.length;
        for (var a = 0; a < pos.length; a++) {
            for (var b = 0; b < pos.length; b++) {
                var row = pos[a], col = pos[b];
                if (m[row][col] !== null) continue;
                for (var r = -2; r <= 2; r++) {
                    for (var c = -2; c <= 2; c++) {
                        m[row + r][col + c] = Math.abs(r) === 2 || Math.abs(c) === 2 || r === 0 && c === 0;
                    }
                }
            }
        }
    }
    function placeTiming(m) {
        var size = m.length;
        for (var i = 8; i < size - 8; i++) {
            if (m[6][i] === null) m[6][i] = i % 2 === 0;
            if (m[i][6] === null) m[i][6] = i % 2 === 0;
        }
    }
    function reserveFormat(m) {
        var size = m.length;
        for (var i = 0; i < 9; i++) {
            if (m[8][i] === null) m[8][i] = false;
            if (m[i][8] === null) m[i][8] = false;
        }
        for (var j = 0; j < 8; j++) {
            if (m[8][size - 1 - j] === null) m[8][size - 1 - j] = false;
            if (m[size - 1 - j][8] === null) m[size - 1 - j][8] = false;
        }
        m[size - 8][8] = true;
    }
    function reserveVersion(m, ver) {
        if (ver < 7) return;
        var size = m.length;
        for (var i = 0; i < 18; i++) {
            var r = Math.floor(i / 3), c = i % 3;
            m[size - 11 + c][r] = false;
            m[r][size - 11 + c] = false;
        }
    }
    function writeFormat(m, mask) {
        var bits = formatInfo(mask), size = m.length;
        for (var i = 0; i < 15; i++) {
            var on = (bits >> i & 1) === 1;
            if (i < 6) m[i][8] = on; else if (i < 8) m[i + 1][8] = on; else if (i === 8) m[8][7] = on; else m[8][15 - i - 1] = on;
            if (i < 8) m[8][size - 1 - i] = on; else m[size - 15 + i][8] = on;
        }
        m[size - 8][8] = true;
    }
    function writeVersion(m, ver) {
        if (ver < 7) return;
        var bits = versionInfo(ver), size = m.length;
        for (var i = 0; i < 18; i++) {
            var on = (bits >> i & 1) === 1;
            var r = Math.floor(i / 3), c = i % 3;
            m[size - 11 + c][r] = on;
            m[r][size - 11 + c] = on;
        }
    }
    function utf8Bytes(str) {
        var out = [];
        for (var i = 0; i < str.length; i++) {
            var c = str.charCodeAt(i);
            if (c < 0x80) out.push(c); else if (c < 0x800) {
                out.push(0xC0 | c >> 6, 0x80 | c & 0x3F);
            } else if (c >= 0xD800 && c <= 0xDBFF && i + 1 < str.length) {
                var c2 = str.charCodeAt(++i);
                var cp = 0x10000 + (c - 0xD800 << 10) + (c2 - 0xDC00);
                out.push(0xF0 | cp >> 18, 0x80 | cp >> 12 & 0x3F, 0x80 | cp >> 6 & 0x3F, 0x80 | cp & 0x3F);
            } else {
                out.push(0xE0 | c >> 12, 0x80 | c >> 6 & 0x3F, 0x80 | c & 0x3F);
            }
        }
        return out;
    }
    function buildCodewords(bytes, ver) {
        var cap = dataCapacity(ver);
        var lenBits = ver < 10 ? 8 : 16;
        var bits = [];
        function push(val, n) {
            for (var i = n - 1; i >= 0; i--) bits.push(val >> i & 1);
        }
        push(0b0100, 4);
        push(bytes.length, lenBits);
        for (var i = 0; i < bytes.length; i++) push(bytes[i], 8);
        var capBits = cap * 8;
        for (var t = 0; t < 4 && bits.length < capBits; t++) bits.push(0);
        while (bits.length % 8 !== 0) bits.push(0);
        var data = [];
        for (var b = 0; b < bits.length; b += 8) {
            var v = 0;
            for (var k = 0; k < 8; k++) v = v << 1 | bits[b + k];
            data.push(v);
        }
        var pad = [ 0xEC, 0x11 ], p = 0;
        while (data.length < cap) data.push(pad[p++ % 2]);
        return data;
    }
    function interleave(data, ver) {
        var t = RS_M[ver], ecLen = t[0];
        var blocks = [], ecBlocks = [], offset = 0;
        function take(count, size) {
            for (var i = 0; i < count; i++) {
                var b = data.slice(offset, offset + size);
                offset += size;
                blocks.push(b);
                ecBlocks.push(rsEncode(b, ecLen));
            }
        }
        take(t[1], t[2]);
        take(t[3], t[4]);
        var out = [], maxData = Math.max(t[2], t[4]), i, j;
        for (i = 0; i < maxData; i++) {
            for (j = 0; j < blocks.length; j++) {
                if (i < blocks[j].length) out.push(blocks[j][i]);
            }
        }
        for (i = 0; i < ecLen; i++) {
            for (j = 0; j < ecBlocks.length; j++) out.push(ecBlocks[j][i]);
        }
        return out;
    }
    function placeData(m, codewords) {
        var size = m.length, bitIdx = 0, dir = -1, row = size - 1;
        function bitAt(n) {
            var byteI = n >> 3;
            if (byteI >= codewords.length) return false;
            return (codewords[byteI] >> 7 - (n & 7) & 1) === 1;
        }
        for (var col = size - 1; col > 0; col -= 2) {
            if (col === 6) col--;
            for (;;) {
                for (var c = 0; c < 2; c++) {
                    var cc = col - c;
                    if (m[row][cc] === null) {
                        m[row][cc] = bitAt(bitIdx++);
                    }
                }
                row += dir;
                if (row < 0 || row >= size) {
                    row -= dir;
                    dir = -dir;
                    break;
                }
            }
        }
    }
    function penalty(m) {
        var size = m.length, score = 0, i, j, run, dark = 0;
        function lineScore(get) {
            var s = 0;
            for (var a = 0; a < size; a++) {
                run = 1;
                for (var b = 1; b < size; b++) {
                    if (get(a, b) === get(a, b - 1)) run++; else {
                        if (run >= 5) s += 3 + (run - 5);
                        run = 1;
                    }
                }
                if (run >= 5) s += 3 + (run - 5);
            }
            return s;
        }
        score += lineScore(function(a, b) {
            return m[a][b];
        });
        score += lineScore(function(a, b) {
            return m[b][a];
        });
        for (i = 0; i < size - 1; i++) {
            for (j = 0; j < size - 1; j++) {
                var v = m[i][j];
                if (v === m[i][j + 1] && v === m[i + 1][j] && v === m[i + 1][j + 1]) score += 3;
            }
        }
        var PAT = [ true, false, true, true, true, false, true, false, false, false, false ];
        var PAT2 = [ false, false, false, false, true, false, true, true, true, false, true ];
        function seqScore(get) {
            var s = 0;
            for (var a = 0; a < size; a++) {
                for (var b = 0; b <= size - 11; b++) {
                    var ok1 = true, ok2 = true;
                    for (var k = 0; k < 11; k++) {
                        var val = get(a, b + k);
                        if (val !== PAT[k]) ok1 = false;
                        if (val !== PAT2[k]) ok2 = false;
                    }
                    if (ok1) s += 40;
                    if (ok2) s += 40;
                }
            }
            return s;
        }
        score += seqScore(function(a, b) {
            return m[a][b];
        });
        score += seqScore(function(a, b) {
            return m[b][a];
        });
        for (i = 0; i < size; i++) for (j = 0; j < size; j++) if (m[i][j]) dark++;
        var ratio = Math.abs(dark * 100 / (size * size) - 50);
        score += Math.floor(ratio / 5) * 10;
        return score;
    }
    function generate(text) {
        var bytes = utf8Bytes(text);
        var ver = 0;
        for (var v = 1; v <= 10; v++) {
            if (dataCapacity(v) >= bytes.length + 2) {
                ver = v;
                break;
            }
        }
        if (!ver) throw new Error("内容太长，超出版本 10 的容量");
        var size = ver * 4 + 17;
        var codewords = interleave(buildCodewords(bytes, ver), ver);
        var best = null, bestScore = Infinity;
        for (var mask = 0; mask < 8; mask++) {
            var m = makeMatrix(size);
            placeFinder(m, 0, 0);
            placeFinder(m, size - 7, 0);
            placeFinder(m, 0, size - 7);
            placeAlignment(m, ver);
            placeTiming(m);
            var reserved = [];
            for (var i = 0; i < size; i++) reserved.push(m[i].map(function(x) {
                return x !== null;
            }));
            reserveFormat(m);
            reserveVersion(m, ver);
            for (i = 0; i < size; i++) {
                for (var j = 0; j < size; j++) {
                    if (m[i][j] !== null) reserved[i][j] = true;
                }
            }
            placeData(m, codewords);
            for (i = 0; i < size; i++) {
                for (j = 0; j < size; j++) {
                    if (!reserved[i][j] && MASKS[mask](i, j)) m[i][j] = !m[i][j];
                }
            }
            writeFormat(m, mask);
            writeVersion(m, ver);
            var sc = penalty(m);
            if (sc < bestScore) {
                bestScore = sc;
                best = m;
            }
        }
        return best;
    }
    function render(canvas, text, opts) {
        opts = opts || {};
        var quiet = opts.quiet === undefined ? 4 : opts.quiet;
        var m = generate(text);
        var n = m.length;
        var total = n + quiet * 2;
        var minPx = opts.minModule || 3;
        var px = Math.max(minPx, Math.round((opts.size || 132) / total));
        var side = px * total;
        canvas.width = side;
        canvas.height = side;
        canvas.style.width = side + "px";
        canvas.style.height = side + "px";
        canvas.style.imageRendering = "pixelated";
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = opts.light || "#ffffff";
        ctx.fillRect(0, 0, side, side);
        ctx.fillStyle = opts.dark || "#000000";
        for (var i = 0; i < n; i++) {
            for (var j = 0; j < n; j++) {
                if (m[i][j]) ctx.fillRect((j + quiet) * px, (i + quiet) * px, px, px);
            }
        }
        return side;
    }
    global.NingningQR = {
        generate,
        render
    };
})(typeof self !== "undefined" ? self : this);
