/**************************************************************************
 * tp-color-picker.js - Color Picker Plugin for Revolution Slider
 * @version: 1.0.2 (5.10.2017)
 * @author ThemePunch
 **************************************************************************/

;window.RevColor = {
    defaultValue: "#ffffff", isColor: /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i, get: function (b) {
        return b ? RevColor.process(b, !0)[0] : "transparent"
    }, parse: function (b, k, l) {
        b = RevColor.process(b, !0);
        var p = [];
        p[0] = k ? k + ": " + b[0] + ";" : b[0];
        l && (p[1] = b[1]);
        return p
    }, convert: function (b, k) {
        if (!b || "string" !== typeof b)return RevColor.defaultValue;
        if ("transparent" === b)return b;
        if (-1 !== b.search(/\[\{/) || -1 !== b.search("gradient") || "undefined" === typeof k || isNaN(k))return RevColor.process(b, !0)[0];
        k = parseFloat(k);
        1 >= k && (k *= 100);
        k = Math.max(Math.min(parseInt(k, 10), 100), 0);
        if (0 === k)return "transparent";
        try {
            if (-1 !== b.search("#") || 8 > b.length)return RevColor.isColor.test(b) || (b = b.replace(/[^A-Za-z0-9#]/g, "")), RevColor.processRgba(RevColor.sanitizeHex(b), k);
            b = RevColor.rgbValues(b, 3);
            return RevColor.rgbaString(b[0], b[1], b[2], .01 * k)
        } catch (l) {
            return RevColor.defaultValue
        }
    }, process: function (b, k) {
        if ("string" !== typeof b)return k && (b = RevColor.sanitizeGradient(b)), [RevColor.processGradient(b), "gradient", b];
        if ("transparent" ===
            b.trim())return ["transparent", "transparent"];
        if (-1 !== b.search(/\[\{/))try {
            return b = JSON.parse(b.replace(/\&/g, '"')), k && (b = RevColor.sanitizeGradient(b)), [RevColor.processGradient(b), "gradient", b]
        } catch (l) {
            return console.log("RevColor.process() failed to parse JSON string"), ["linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(0, 0, 0, 1) 100%)", "gradient", {
                type: "linear",
                angle: "0",
                colors: [{r: "255", g: "255", b: "255", a: "1", position: "0", align: "bottom"}, {
                    r: "0",
                    g: "0",
                    b: "0",
                    a: "1",
                    position: "100",
                    align: "bottom"
                }]
            }]
        } else return -1 !==
        b.search("#") ? [RevColor.sanitizeHex(b), "hex"] : -1 !== b.search("rgba") ? [b.replace(/\s/g, "").replace(/false/g, "1"), "rgba"] : [b.replace(/\s/g, ""), "rgb"]
    }, transparentRgba: function (b, k) {
        return k || "rgba" === RevColor.process(b)[1] ? "0" === RevColor.rgbValues(b, 4)[3] : !1
    }, rgbValues: function (b, k) {
        b = b.substring(b.indexOf("(") + 1, b.lastIndexOf(")")).split(",");
        3 === b.length && 4 === k && (b[3] = "1");
        for (var l = 0; l < k; l++)b[l] = b[l].trim();
        return b
    }, rgbaString: function (b, k, l, p) {
        return "rgba(" + b + ", " + k + ", " + l + ", " + p + ")"
    }, rgbToHex: function (b) {
        b =
            RevColor.rgbValues(b, 3);
        return RevColor.getRgbToHex(b[0], b[1], b[2])
    }, rgbaToHex: function (b) {
        b = RevColor.rgbValues(b, 4);
        return [RevColor.getRgbToHex(b[0], b[1], b[2]), b[3]]
    }, getOpacity: function (b) {
        return parseInt(100 * RevColor.rgbValues(b, 4)[3], 10) + "%"
    }, getRgbToHex: function (b, k, l) {
        return "#" + ("0" + parseInt(b).toString(16)).slice(-2) + ("0" + parseInt(k).toString(16)).slice(-2) + ("0" + parseInt(l).toString(16)).slice(-2)
    }, joinToRgba: function (b) {
        b = b.split("||");
        return RevColor.convert(b[0], b[1])
    }, processRgba: function (b,
                              k) {
        b = b.replace("#", "");
        var l = "undefined" !== typeof k, p = (l ? "rgba" : "rgb") + "(" + parseInt(b.substring(0, 2), 16) + ", " + parseInt(b.substring(2, 4), 16) + ", " + parseInt(b.substring(4, 6), 16);
        return p = l ? p + (", " + (.01 * parseInt(k, 10)).toFixed(2).replace(/\.?0*$/, "") + ")") : p + ")"
    }, processGradient: function (b) {
        var k = b.type, l = "linear" === k ? b.angle + "deg, " : "ellipse at center, ";
        b = b.colors;
        for (var p = b.length, B = "", u, y = 0; y < p; y++)0 < y && (B += ", "), u = b[y], B += "rgba(" + u.r + ", " + u.g + ", " + u.b + ", " + u.a + ") " + u.position + "%";
        return k + "-gradient(" +
            l + B + ")"
    }, sanitizeHex: function (b) {
        b = b.replace("#", "").trim();
        if (3 === b.length) {
            var k = b.charAt(0), l = b.charAt(1);
            b = b.charAt(2);
            b = k + k + l + l + b + b
        }
        return "#" + b
    }, sanitizeGradient: function (b) {
        for (var k = b.colors, l = k.length, p = [], B, u = 0; u < l; u++) {
            var y = k[u];
            delete y.align;
            B ? JSON.stringify(y) !== JSON.stringify(B) && (p[p.length] = y) : p[p.length] = y;
            B = y
        }
        b.colors = p;
        return b
    }
};
(function (b) {
    function k() {
        this.innerHTML = T[this.getAttribute("data-text") || ""]
    }

    function l() {
        this.setAttribute("placeholder", T[this.getAttribute("data-placeholder") || ""])
    }

    function p() {
        this.setAttribute("data-message", T[this.getAttribute("data-alert") || ""])
    }

    function B(a) {
        a || (a = {});
        "string" === typeof a && (a = JSON.parse(a.replace(/\&/g, '"')));
        T = b.extend({}, wa, a);
        Va = T.color;
        n.find("*[data-placeholder]").each(l);
        n.find("*[data-alert]").each(p);
        n.find("*[data-text]").each(k)
    }

    function u(a, c, d, e) {
        if (b.isPlainObject(a)) {
            var g;
            for (g in a)if (a.hasOwnProperty(g)) {
                a = a[g];
                if ("string" === typeof a) {
                    a = RevColor.process(a);
                    if ("gradient" === a[1]) {
                        var h = a[2];
                        var ga = h.angle;
                        var r = h.type
                    }
                    a = a[0]
                } else ga = a.angle, r = a.type;
                var f = isNaN(g) ? g.replace(/_/g, " ").replace(/\b\w/g, function (a) {
                    return a.toUpperCase()
                }) : "radial" !== r ? ga + "&deg;" : "radial"
            }
        } else f = a;
        if ("blank" !== a)return b.isPlainObject(a) && (h = a, a = e || RevColor.processGradient(a)), a = '<span class="rev-cpicker-color tptip' + d + '" data-title="' + f + '" data-color="' + a + '"><span class="rev-cpicker-preset-tile"></span><span class="rev-cpicker-preset-bg" style="background: ' +
            a + '"></span>', c || (a += '<span class="rev-cpicker-delete"><span class="rev-cpicker-delete-icon"></span></span>'), c = b(a + "</span>"), h && c.data("gradient", h), c[0];
        c = document.createElement("span");
        c.className = "rev-cpicker-color blank";
        return c
    }

    function y() {
        var a = (this.getAttribute("data-color") || "").toLowerCase(), c = ha ? !1 : a === Wa.toLowerCase();
        if (a === ia || c)return a = b(this), a.closest(".rev-cpicker-presets-group").find(".rev-cpicker-color.selected").removeClass("selected"), q = a, ha && !xa && ya(q.data("gradient"),
            !0), q.addClass("selected"), !1
    }

    function O(a, c, b) {
        if (A) {
            a || (c = c || t.val(), b = "undefined" !== typeof b ? b : w.val(), c = "transparent" === c ? "transparent" : "100%" === b ? RevColor.sanitizeHex(c) : RevColor.processRgba(c, b));
            var d = (b = "transparent" === c) ? "" : c;
            a ? H.data("state", c) : D.data("state", c);
            b ? A.css("background", d) : A[0].style.background = d;
            za && za(m, c);
            I.trigger("revcolorpickerupdate", [m, c])
        }
    }

    function ya(a, c) {
        var d = RevColor.process(a), e = d[1], g = d[0];
        ja && J.removeClass("checked");
        if ("gradient" !== e) {
            switch (e) {
                case "hex":
                    a =
                        RevColor.sanitizeHex(g);
                    w.val("100%");
                    U(100);
                    break;
                case "rgba":
                    var d = RevColor.rgbaToHex(g), h = parseInt(100 * d[1], 10);
                    a = d[0];
                    w.val(h + "%");
                    U(h);
                    break;
                case "rgb":
                    a = RevColor.rgbToHex(g);
                    w.val("100%");
                    U(100);
                    break;
                default:
                    ka.click(), D.click()
            }
            K.val(a).change();
            c || D.click()
        } else if (ja) {
            d = d[2];
            h = d.angle;
            "radial" === d.type && (h = "radial");
            P.removeClass("selected");
            b('.rev-cpicker-orientation[data-direction="' + h + '"]').addClass("selected");
            z.val(Aa(h));
            Xa(h);
            for (var d = d.colors, h = document.createDocumentFragment(),
                     ga = d.length, r, f, k = 0; k < ga; k++)f = d[k], r = f.align, h.appendChild(Ya(r, f.position, Za(f), $a(f, r)));
            Q && Q.draggable("destroy");
            L.empty().append(h);
            Q = L.children().draggable(V);
            x();
            c || (ab = !0, H.click())
        } else K.val(RevColor.defaultValue).change(), D.click();
        return [g, e]
    }

    function bb(a, c) {
        a:{
            var d = v.slice();
            var e = d.length;
            for (d.sort(Ba); e--;) {
                var g = d[e];
                if (g.align === a && g.x < c) {
                    d = g;
                    break a
                }
            }
            for (var e = d.length, h = 0; h < e; h++)if (g = d[h], g.align === a && g.x > c) {
                d = g;
                break a
            }
            d = void 0
        }
        e = d.color;
        d = $a(e, a, !0);
        e = Za(e, !0);
        d = Ya(a, c, e,
            d);
        f && f.removeClass("active");
        f = b(d).addClass("active").appendTo(L).draggable(V);
        la = f.children(".rev-cpicker-point-square")[0];
        ma = f.children(".rev-cpicker-point-triangle")[0];
        Q = L.children();
        e = cb(c);
        x(d);
        "bottom" === a && R.val(e[1]).change()
    }

    function cb(a) {
        "undefined" === typeof a && (a = v[na].x);
        var b = f.attr("data-color"), d = f.hasClass("rev-cpicker-point-bottom");
        if (d)E.hasClass("active") && (W.attr("disabled", "disabled"), M.attr("disabled", "disabled"), E.removeClass("active")), b = RevColor.rgbaToHex(b)[0], X.css("background",
            b), N.removeAttr("disabled").val(a + "%"), 2 < n.find(".rev-cpicker-point-bottom").length && F.addClass("active"), n.addClass("open"); else {
            F.hasClass("active") && (X.css("background", ""), N.attr("disabled", "disabled"), F.removeClass("active"));
            var e = RevColor.getOpacity(b);
            W.attr("data-opacity", e).val(e).removeAttr("disabled");
            M.val(a + "%").removeAttr("disabled");
            2 < n.find(".rev-cpicker-point-top").length && E.addClass("active");
            n.removeClass("open")
        }
        return [d, b]
    }

    function $a(a, b, d) {
        return "bottom" === b ? "rgb(" + a.r + "," +
        a.g + "," + a.b + ")" : "rgba(0, 0, 0, " + (d ? "1" : a.a) + ")"
    }

    function Za(a, b) {
        return "rgba(" + a.r + "," + a.g + "," + a.b + "," + (b ? "1" : a.a) + ")"
    }

    function Ya(a, c, d, e) {
        var g = document.createElement("span");
        g.className = "rev-cpicker-point rev-cpicker-point-" + a;
        "string" === typeof d ? g.setAttribute("data-color", d) : b(g).data("gradient", d);
        g.setAttribute("data-location", c);
        g.style.left = c + "%";
        g.innerHTML = "bottom" === a ? '<span class="rev-cpicker-point-triangle" style="border-bottom-color: ' + e + '"></span><span class="rev-cpicker-point-square" style="background: ' +
        e + '"></span>' : '<span class="rev-cpicker-point-square" style="background: ' + e + '"></span><span class="rev-cpicker-point-triangle" style="border-top-color: ' + e + '"></span>';
        return g
    }

    function Aa(a) {
        a && "radial" !== a || (a = "0");
        Ca.innerHTML = a + "&deg;";
        return Ca.value
    }

    function db() {
        f && (f.removeClass("active"), f = !1);
        N.attr("disabled", "disabled");
        W.attr("disabled", "disabled");
        M.attr("disabled", "disabled");
        E.removeClass("active");
        F.removeClass("active");
        X.css("background", "");
        n.removeClass("open")
    }

    function Da(a,
                b) {
        n.removeClass("active is-basic").hide();
        Y.removeClass("rev-colorpicker-open");
        Z.css({left: "", top: ""});
        oa && (oa.remove(), oa = !1);
        q ? (q.hasClass("selected") ? (b && m.data("hex", q.attr("data-color").toLowerCase()), q.removeClass("selected")) : m.removeData("hex"), q = !1) : m.removeData("hex");
        b || (Ea && Ea(), G && "transparent" !== G ? A[0].style.background = G : A.css("background", ""), I.trigger("revcolorpickerupdate", [m, G]));
        m = A = !1
    }

    function Fa() {
        var a = b(this).children(".rev-cpicker-color").not(".blank").length;
        6 < a ? b("#" + this.id +
            "-btn").addClass("multiplerows") : b("#" + this.id + "-btn").removeClass("multiplerows");
        return a
    }

    function Bb() {
        for (var a = b(this), c = -1 !== this.id.search("colors") ? 5 : 6, a = a.children(".rev-cpicker-color"), d = a.length, e = Math.ceil(d / 6), c = 6 * c, g, d = d + 1, h = 0; h < e; h++) {
            var f = 6 * h, f = a.slice(f, parseInt(f + 6, 10) - 1);
            Ga = !0;
            f.each(Cb);
            Ga && (d -= 6, d >= c && (f.remove(), g = !0))
        }
        return g
    }

    function Cb() {
        if (-1 === this.className.search("blank"))return Ga = !1
    }

    function x(a, b, d) {
        Ha = b;
        eb();
        Ha = !1;
        for (var c, g = [], h = v.length, f = 0; f < h; f++)c = v[f], b = c.color,
            g[f] = b, c = c.el, c.setAttribute("data-color", RevColor.rgbaString(b.r, b.g, b.b, b.a)), c.setAttribute("data-opacity", 100 * b.a), a && a === c && (na = f);
        fb.hasClass("selected") ? (C.type = "radial", C.angle = "0") : (C.type = "linear", C.angle = parseInt(z.val(), 10).toString());
        C.colors = g;
        q && q.removeClass("selected");
        a = RevColor.processGradient(C);
        O(!0, a);
        if (d)return [C, a];
        d = gb.style;
        g = a.replace("radial-", "linear-");
        g = g.split("(");
        b = g[0];
        g.shift();
        g = g.join("(").split(",");
        g.shift();
        b = b + "(90deg," + g.join(",");
        d.background = b;
        pa.style.background =
            a
    }

    function hb(a, b) {
        if (0 === a)return !1;
        for (var c; a--;)if (c = v[a], c.align !== b)return c;
        return !1
    }

    function ib(a, b, d) {
        if (a === d)return !1;
        for (var c; a++ < d;)if (c = v[a], c.align !== b)return c;
        return !1
    }

    function Ia(a, b, d, e, g) {
        return Math.max(Math.min(Math.round(Math.abs((a - b) / (d - b) * (g - e) + e)), 255), 0)
    }

    function eb() {
        v = [];
        aa = [];
        ba = [];
        Q.each(Db);
        v.sort(Ba);
        for (var a = v.length, b = a - 1, d, e, g, h, f = 0; f < a; f++)if (d = v[f], g = d.align, e = hb(f, g), !1 === e && (e = ib(f, g, b)), h = ib(f, g, b), !1 === h && (h = hb(f, g)), "bottom" === g) {
            g = d;
            var r = e.alpha, k = h.alpha;
            r !== k ? (e = e.x, h = Math.max(Math.min(Math.abs(parseFloat(((g.x - e) / (h.x - e) * (k - r)).toFixed(2)) + parseFloat(r)), 1), 0).toFixed(2)) : h = r;
            g.alpha = h;
            g.color.a = h
        } else g = d.color, k = e.color, r = h.color, e !== h ? (d = d.x, e = e.x, h = h.x, g.r = Ia(d, e, h, k.r, r.r), g.g = Ia(d, e, h, k.g, r.g), g.b = Ia(d, e, h, k.b, r.b)) : (g.r = k.r, g.g = k.g, g.b = k.b);
        v.sort(Ba)
    }

    function Ba(a, b) {
        return a.x < b.x ? -1 : a.x > b.x ? 1 : 0
    }

    function Db(a) {
        var b = RevColor.rgbValues(this.getAttribute("data-color") || "", 4), d = -1 !== this.className.search("bottom") ? "bottom" : "top", e = b[3].replace(/\.?0*$/,
                "") || 0, g = parseInt(this.style.left, 10);
        Ha && (g = 50 > g ? g + 2 * (50 - g) : g - 2 * (g - 50), this.style.left = g + "%", this.setAttribute("data-location", g));
        v[a] = {
            el: this,
            x: g,
            alpha: e,
            align: d,
            color: {r: parseInt(b[0], 10), g: parseInt(b[1], 10), b: parseInt(b[2], 10), a: e, position: g, align: d}
        };
        f && f[0] !== this && ("bottom" === d ? ba[ba.length] = g : aa[aa.length] = g)
    }

    function Xa(a) {
        a = "undefined" !== typeof a ? a : parseInt(z.val(), 10);
        jb[0].style.transform = "rotate(" + a + "deg)"
    }

    function Ja(a, c, d) {
        var e = "undefined" !== typeof d;
        d = e ? d : parseInt(z.val(), 10);
        if (a &&
            "keyup" === a.type) {
            var g = !isNaN(d) && -360 <= d && 360 >= d;
            var h = d
        } else {
            a = parseInt(z.data("orig-value"), 10);
            d || (d = "0");
            if (isNaN(d) || -360 > d || 360 < d)d = a;
            d !== a && (h = d, g = !0, z.val(Aa(d)), e || (d = c || d, P.removeClass("selected"), b('.rev-cpicker-orientation[data-direction="' + d + '"]').addClass("selected")))
        }
        if (g || c)h && Xa(h), x()
    }

    function kb() {
        var a = b(this);
        -1 !== this.className.search("down") ? (a.parent().addClass("active"), a.closest(".rev-cpicker-presets").addClass("active"), b(this.id.replace("-btn", "")).addClass("active"),
            qa = n.hasClass("gradient-view")) : (a.parent().removeClass("active"), a.closest(".rev-cpicker-presets").removeClass("active"), b(this.id.replace("-btn", "")).removeClass("active"), qa = !1)
    }

    function Eb(a, b) {
        var c = parseInt(100 * (Math.round(b.position.left) / 263).toFixed(2), 10);
        "bottom" === Ka ? N.val(c + "%").trigger("keyup") : M.val(c + "%").trigger("keyup")
    }

    function Fb() {
        var a = b(this);
        Ka = a.hasClass("rev-cpicker-point-bottom") ? "bottom" : "top";
        a.click()
    }

    function Gb() {
        "bottom" === Ka ? N.trigger("focusout") : M.trigger("focusout")
    }

    function U(a) {
        La = !0;
        Ma.slider("value", Math.round(1.8 * a));
        La = !1
    }

    function lb(a) {
        var b = ca.offset(), d = a.pageX - b.left;
        a = a.pageY - b.top;
        isNaN(d) || isNaN(a) || (d = 180 / Math.PI * Math.atan2(a - 30, d - 30) + 90, 0 > d && (d += 360), d = Math.max(0, Math.min(360, Math.round(d))), d = 5 * Math.round(d / 5), Ja(!1, !1, d))
    }

    function da(a) {
        a.stopImmediatePropagation()
    }

    function Hb() {
        Na || b.tpColorPicker();
        mb = document.getElementById("rev-cpicker-current-edit");
        pa = document.getElementById("rev-cpicker-gradient-output");
        gb = document.getElementById("rev-cpicker-gradient-input");
        Oa = document.getElementById("rev-cpicker-edit-title");
        Ca = document.createElement("textarea");
        E = b("#rev-cpicker-opacity-delete");
        L = b("#rev-cpciker-point-container");
        M = b("#rev-cpicker-opacity-location");
        S = b(".rev-cpicker-presets-group");
        w = b("#rev-cpicker-color-opacity");
        fb = b("#rev-cpicker-orientation-radial");
        F = b("#rev-cpicker-color-delete");
        W = b("#rev-cpicker-grad-opacity");
        N = b("#rev-cpicker-color-location");
        Pa = b("#rev-cpicker-gradients-core");
        P = b(".rev-cpicker-orientation");
        R = b("#rev-cpicker-iris-gradient");
        jb = b("#rev-cpicker-wheel-point");
        nb = b("#rev-cpicker-gradients");
        K = b("#rev-cpicker-iris-color");
        H = b("#rev-cpicker-gradient-btn");
        ra = b("#rev-cpicker-gradient-hex");
        ka = b("#rev-cpciker-clear-hex");
        J = b("#rev-cpicker-meta-reverse");
        sa = b("#rev-cpicker-hit-bottom");
        Ma = b("#rev-cpicker-scroll");
        ob = b("#rev-cpicker-colors");
        t = b("#rev-cpicker-color-hex");
        D = b("#rev-cpicker-color-btn");
        X = b("#rev-cpicker-color-box");
        z = b("#rev-cpicker-meta-angle");
        ca = b("#rev-cpicker-wheel");
        ea = b("#rev-cpicker-hit-top");
        Z = b("#rev-cpicker");
        I = b(document);
        V.drag = Eb;
        V.stop = Gb;
        V.start = Fb;
        D.data("state", ob.find(".rev-cpicker-color").eq(0).attr("data-color") || "#ffffff");
        H.data("state", nb.find(".rev-cpicker-color").eq(0).attr("data-color") || "linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(0, 0, 0, 1) 100%)");
        Z.draggable({
            containment: "window", handle: ".rev-cpicker-draggable", stop: function () {
                Z.css("height", "auto")
            }
        });
        S.perfectScrollbar({wheelPropagation: !1, suppressScrollX: !0});
        ca.on("mousedown.revcpicker", function (a) {
            P.removeClass("selected");
            Qa = !0;
            lb(a)
        }).on("mousemove.revcpicker", function (a) {
            Qa && lb(a)
        }).on("mouseleave.revcpicker mouseup.revcpicker", function () {
            Qa = !1
        });
        b(".rev-cpicker-main-btn").on("click.revcpicker", function () {
            xa = -1 === this.id.search("gradient");
            if (A) {
                var a = b(this);
                a = a.data("state")
            }
            xa ? (A && (ia = t.val()), n.removeClass("gradient-view").addClass("color-view")) : (A && (ia = a), n.removeClass("color-view").addClass("gradient-view"), ab || Pa.children(".rev-cpicker-color").not(".blank").eq(0).click());
            S.perfectScrollbar("update");
            if (a) {
                var c =
                    "transparent" === a, d = c ? "" : a;
                c ? A.css("background", d) : A[0].style.background = d;
                ha = !0;
                b(".rev-cpicker-color").not(".blank").each(y);
                ha = !1;
                I.trigger("revcolorpickerupdate", [m, a])
            }
        });
        b("#rev-cpicker-check").on("click.revcipicker", function () {
            if (n.hasClass("color-view")) {
                var a = t.val();
                var c = w.val();
                m.removeData("gradient");
                a = "transparent" === a ? "transparent" : "100%" === c ? RevColor.sanitizeHex(a) : RevColor.processRgba(a, c);
                c = [m, a, !1]
            } else {
                db();
                a = x(!1, !1, !0);
                c = b.extend({}, a[0]);
                var d = a[1];
                m.data("gradient", d);
                a = JSON.stringify(c).replace(/\"/g,
                    "&");
                c = [m, d, c]
            }
            if (d = c[1] !== G)m.attr("data-color", c[1]).val(a).change(), I.trigger("revcolorpicker", c), Ra && Ra(c[0], c[1], c[2]);
            Da(!1, d)
        });
        n.on("click.revcpicker", function (a) {
            if (n.hasClass("open")) {
                var c = a.target;
                a = b(c);
                var d = c.id;
                (c = -1 !== c.className.search("rev-cpicker-point") || "rev-cpicker-section-right" === d || -1 !== d.search("hit") || a.closest("#rev-cpicker-section-right, #rev-cpicker-point-wrap").length) && ("text" === a.attr("type") ? c = !a.attr("disabled") : "rev-cpicker-check-gradient" === d && (c = !1));
                c || db()
            } else Sa &&
            !1 === /wheel|angle|reverse/.test(a.target.id) && (-1 === a.target.id.search("radial") && b('.rev-cpicker-orientation[data-direction="' + parseInt(z.val()) + '"]').addClass("selected"), ca.removeClass("active"), Sa = !1)
        });
        b(".rev-cpicker-close").on("click.revcpicker", Da);
        K.wpColorPicker({
            palettes: !1, width: 267, border: !1, hide: !1, change: function (a, b) {
                var c = b.color.toString();
                this.value = c;
                t.val(c);
                if (!Ta) {
                    var e = w.val();
                    0 === parseInt(e, 10) && (c = "transparent");
                    O(!1, c, e);
                    q && (q.removeClass("selected"), q = !1)
                }
            }
        });
        R.wpColorPicker({
            palettes: !1,
            height: 250, border: !1, hide: !1, change: function (a, b) {
                var c = b.color.toString();
                this.value = c;
                ra.val(c);
                X.css("background", c);
                la.style.backgroundColor = c;
                ma.style.borderBottomColor = c;
                var c = RevColor.processRgba(c, 100), e = RevColor.rgbValues(c, 4), g = C.colors[na];
                g.r = e[0];
                g.g = e[1];
                g.b = e[2];
                g.a = e[3];
                f.attr("data-color", c);
                x()
            }
        });
        Ma.slider({
            orientation: "vertical", max: 180, value: 180, start: function () {
                pb = "transparent" === t.val()
            }, slide: function (a, b) {
                if (!La) {
                    var c = parseInt(100 * (b.value / 180).toFixed(2), 10);
                    if (pb) {
                        var e =
                            c ? "#ffffff" : "transparent";
                        t.val(e)
                    }
                    0 === c && (e = "transparent");
                    O(!1, e, c || "transparent");
                    w.val(c + "%")
                }
            }
        });
        b(".rev-cpicker-point-location").on("keyup.revcpicker focusout.revcpicker", function (a) {
            if (f) {
                var b = f.hasClass("rev-cpicker-point-bottom") ? "bottom" : "top", d = "bottom" === b ? ba : aa, b = "bottom" === b ? N : M, e = b.val().replace("%", "") || "0";
                a = a.type;
                var g;
                isNaN(e) && (e = "keyup" === a ? "0" : f.attr("data-location"));
                e = Math.max(0, Math.min(100, parseInt(e, 10)));
                for (g = 50 > e ? 1 : -1; -1 !== d.indexOf(e);)e += g;
                "focusout" === a && (b.val(e +
                    "%"), f.attr("data-location", e));
                f.css("left", e + "%");
                x()
            }
        }).on("focusin.revcpicker", da);
        b("body").on("click.revcpicker", ".rev-cpicker-point", function () {
            L.find(".rev-cpicker-point.active").removeClass("active");
            f = b(this).addClass("active");
            la = f.children(".rev-cpicker-point-square")[0];
            ma = f.children(".rev-cpicker-point-triangle")[0];
            x(this);
            q = !1;
            var a = cb();
            a[0] && R.val(a[1]).change()
        }).on("mousedown.revcpicker", ".rev-cpicker-point", function (a) {
            f = b(this).data("mousestart", a.pageY)
        }).on("mousemove.revcpicker",
            function (a) {
                if (f && f.data("mousestart")) {
                    var b = f.data("mousestart");
                    a = a.pageY;
                    f.hasClass("rev-cpicker-point-bottom") ? a > b && 15 < a - b && F.hasClass("active") ? f.addClass("warning") : f.removeClass("warning") : b > a && 15 < b - a && E.hasClass("active") ? f.addClass("warning") : f.removeClass("warning")
                }
            }).on("mouseup.revcpicker", function (a) {
            if (f && f.data("mousestart")) {
                var b = f.data("mousestart");
                a = a.pageY;
                f.removeData("mousestart");
                f.hasClass("rev-cpicker-point-bottom") ? a > b && 10 < a - b && F.hasClass("active") ? F.click() : f.removeClass("warning") :
                    b > a && 10 < b - a && E.hasClass("active") ? E.click() : f.removeClass("warning")
            }
        }).on("change.revcpicker", ".rev-cpicker-component", function () {
            var a = b(this), c = a.data("gradient") || a.val() || "transparent";
            if ("transparent" === c || RevColor.transparentRgba(c))c = "";
            a.data("tpcp").css("background", c)
        }).on("keypress.revcpicker", function (a) {
            n.hasClass("active") && (a = a.which, 27 == a ? Da() : 13 == a && ta && ta.blur())
        }).on("click.revcpicker", ".rev-cpicker-color:not(.blank)", function () {
            if (q) {
                if (q[0] === this && q.hasClass("selected"))return;
                q.removeClass("selected")
            }
            q = b(this);
            var a = q.parent()[0].id, c = -1 !== a.search("core") ? "core" : "custom", a = -1 !== a.search("colors") ? "colors" : "gradients", c = b("#rev-cpicker-" + a + "-" + c + "-btn");
            c.hasClass("active") && c.find(".rev-cpicker-arrow-up").click();
            n.hasClass("color-view") ? (c = q.attr("data-color"), Ta = !0, K.val(c).change(), "transparent" === t.val() && t.val(c.toLowerCase()), Ta = !1, a = w.val(), 0 === parseInt(a, 10) && (c = "transparent"), O(!1, c, a)) : (ea.removeClass("full"), sa.removeClass("full"), ya(q.data("gradient"), !0),
                J.removeClass("checked"), Pa.find(".rev-cpicker-color.selected").removeClass("selected"));
            q.addClass("selected")
        }).on("mouseover.revcpicker", ".rev-cpicker-color:not(.blank)", function () {
            qa && (pa.style.background = this.getAttribute("data-color") || "")
        }).on("mouseout.revcpicker", ".rev-cpicker-color:not(.blank)", function () {
            qa && x()
        }).on("click.revcpicker", ".rev-cpicker-delete", function () {
            if (fa) {
                if (window.confirm(document.getElementById("rev-cpicker-remove-delete").innerHTML)) {
                    n.addClass("onajax onajaxdelete");
                    var a = b(this), c = a.parent(), d = c.attr("data-title") || "";
                    if (!d) {
                        console.log("Preset does not have a name/title");
                        return
                    }
                    var e = a.closest(".rev-cpicker-presets-group")[0].id, g = -1 !== e.search("colors") ? "colors" : "gradients";
                    I.off("revcpicker_onajax_delete.revcpicker").on("revcpicker_onajax_delete.revcpicker", function (d, g) {
                        g && console.log(g);
                        var h = a.closest(".rev-cpicker-presets-group"), f = h.find(".ps-scrollbar-x-rail"), k = b("#" + e + "-btn");
                        c.remove();
                        Bb.call(h[0]) ? h.perfectScrollbar("update") : b('<span class="rev-cpicker-color blank"></span>').insertBefore(f);
                        7 > Fa.call(h[0]) && (b('<span class="rev-cpicker-color blank"></span>').insertBefore(f), k.hasClass("active") && k.children(".rev-cpicker-arrow-up").click());
                        n.removeClass("onajax onajaxdelete")
                    });
                    d = b.trim(d.replace(/\W+/g, "_")).replace(/^\_|\_$/g, "").toLowerCase();
                    fa("delete", d, g, "revcpicker_onajax_delete", m)
                }
                return !1
            }
            console.log("Ajax callback not defined")
        });
        b(".rev-cpicker-save-preset-btn").on("click.revcpicker", function () {
            if (fa) {
                var a, c = b(this), d = c.closest(".rev-cpicker-presets-save-as").find(".rev-cpicker-preset-save").val();
                if (d && isNaN(d)) {
                    var e = n.hasClass("color-view") ? "colors" : "gradients";
                    d = b.trim(d.replace(/\W+/g, "_")).replace(/^\_|\_$/g, "").toLowerCase();
                    b("#rev-cpicker-" + e + "-custom").find(".rev-cpicker-color").not(".blank").each(function () {
                        if (b.trim((this.getAttribute("data-title") || "").replace(/\W+/g, "_")).replace(/^\_|\_$/g, "").toLowerCase() === d)return alert(c.attr("data-message")), a = !0, !1
                    });
                    if (!a) {
                        n.addClass("onajax onajaxsave");
                        var g = {};
                        if ("colors" === e) {
                            var h = t.val();
                            var f = w.val();
                            h = "transparent" === h ? "transparent" :
                                "100%" === f ? RevColor.sanitizeHex(h) : RevColor.processRgba(h, f)
                        } else {
                            var k = pa.style.background;
                            h = b.extend({}, x(!1, !1, !0)[0])
                        }
                        g[d] = h;
                        I.off("revcpicker_onajax_save.revcpicker").on("revcpicker_onajax_save.revcpicker", function (a, d) {
                            if (d)n.removeClass("onajax onajaxsave"), alert(c.attr("data-message")); else {
                                var h = b(u(g, !1, " rev-picker-color-custom", k)), f = b("#rev-cpicker-" + e + "-custom"), r = f.find(".rev-cpicker-color.blank"), m = b("#" + f[0].id + "-btn");
                                r.length ? h.insertBefore(r.eq(0)) : h.insertBefore(f.find(".ps-scrollbar-x-rail"));
                                b("#rev-cpicker-" + e + "-custom-btn").click();
                                6 < Fa.call(f[0]) && (r.length && r.last().remove(), m.addClass("active").children(".rev-cpicker-arrow-down").click(), f.perfectScrollbar("update"));
                                h.click();
                                n.removeClass("onajax onajaxsave")
                            }
                        });
                        fa("save", g, e, "revcpicker_onajax_save", m)
                    }
                } else alert(c.attr("data-message"))
            } else console.log("Ajax callback not defined")
        });
        b(".rev-cpicker-preset-title").on("click.revcpicker", function () {
            var a = b(this), c = a.parent(), d = a.hasClass("active") ? "down" : "up";
            kb.call(a.find(".rev-cpicker-arrow-" +
                d)[0]);
            c.find(".rev-cpicker-preset-title").removeClass("selected");
            a.addClass("selected");
            c.find(".rev-cpicker-presets-group").hide();
            document.getElementById(this.id.replace("-btn", "")).style.display = "block";
            S.perfectScrollbar("update")
        });
        ka.on("click.revcpicker", function () {
            w.val("0%");
            U(0);
            K.val(RevColor.defaultValue).change();
            t.val("transparent");
            O(!1, "transparent")
        });
        n.find('input[type="text"]').on("focusin.revcpicker", function () {
            ta = this
        }).on("focusout.revcpicker", function () {
            ta = !1
        });
        b(".rev-cpicker-input").on("focusin.revcpicker",
            function () {
                var a = b(this);
                a.data("orig-value", a.val())
            });
        b(".rev-cpicker-hex").on("focusout.revcpicker", function () {
            var a;
            if ("rev-cpicker-color-hex" === this.id) {
                if (a = t.val())if (a = RevColor.sanitizeHex(a), RevColor.isColor.test(a))t.val(a); else if (a = b(this), a = a.data("orig-value"))t.val(a); else {
                    ka.click();
                    return
                } else a = "transparent";
                K.val(a).change()
            } else a = ra.val() || RevColor.defaultValue, a = RevColor.sanitizeHex(a), RevColor.isColor.test(a) || (a = b(this), a = (a = a.data("orig-value")) ? a : RevColor.defaultValue), ra.val(a),
                R.val(a).change()
        }).on("focusin.revcpicker", da);
        b("#rev-cpciker-clear-gradient").on("click.revcpicker", function () {
            R.val(RevColor.defaultValue).change()
        });
        z.on("keyup.revcpicker focusout.revcpicker", Ja).on("focusin.revcpicker", function () {
            Sa = !0;
            ca.addClass("active")
        }).on("focusin.revcpicker", da);
        P.on("click.revcpicker", function () {
            var a = b(this), c = a.attr("data-direction");
            P.removeClass("selected");
            a.addClass("selected");
            "radial" !== c ? z.removeAttr("disabled").val(Aa(c)) : z.attr("disabled", "disabled");
            Ja(!1,
                c)
        });
        b(".rev-cpicker-point-delete").on("click.revcpicker", function () {
            if (-1 !== this.className.search("active")) {
                var a = f.hasClass("rev-cpicker-point-bottom") ? "bottom" : "top", b = n.find(".rev-cpicker-point-" + a).length;
                2 < b && (f.draggable("destroy").remove(), Q = L.children(), n.click(), x());
                20 >= b && ("bottom" === a ? sa.removeClass("full") : ea.removeClass("full"))
            }
        });
        b(".rev-cpicker-preset-save").on("focusin.revcpicker", da);
        b(".rev-cpicker-opacity-input").on("keyup.revcpicker focusout.revcpicker", function (a) {
            var c = -1 ===
                this.id.search("grad"), d = c ? w : W, e = d.val().replace("%", "");
            a = a.type;
            isNaN(e) && (e = "keyup" === a ? "0" : b(this).data("orig-value"));
            e = Math.max(0, Math.min(100, e));
            "focusout" === a && (d.val(e + "%"), c || f.attr("data-opacity", e));
            c ? (c = parseInt(e, 10), O(!1, 0 !== c ? !1 : "transparent", e), U(e)) : (c = RevColor.rgbValues(f.attr("data-color"), 3), d = C.colors[na], e = (.01 * parseInt(e, 10)).toFixed(2).replace(/\.?0*$/, ""), d.r = c[0], d.g = c[1], d.b = c[2], d.a = e, c = RevColor.rgbaString(d.r, d.g, d.b, e), f.attr("data-color", c), x(), c = "rgba(0, 0, 0, " +
                e + ")", la.style.backgroundColor = c, ma.style.borderTopColor = c)
        }).on("focusin.revcpicker", da);
        b(".rev-cpicker-builder-hit").on("click.revcpicker", function (a) {
            v || eb();
            a = parseInt(100 * ((a.pageX - ea.offset().left) / 265).toFixed(2), 10);
            for (var b = -1 !== this.id.search("bottom") ? "bottom" : "top", d = "bottom" === b ? ba : aa, e = 50 > a ? 1 : -1; -1 !== d.indexOf(a);)a += e;
            "bottom" === b ? 20 > n.find(".rev-cpicker-point-bottom").length ? (bb(b, a), q = !1) : sa.addClass("full") : 20 > n.find(".rev-cpicker-point-top").length ? (bb(b, a), q = !1) : ea.addClass("full")
        });
        J.on("click.revcpicker", function () {
            J.hasClass("checked") ? J.removeClass("checked") : J.addClass("checked");
            x(!1, !0)
        });
        b(".rev-cpicker-arrow").on("click.revcpicker", kb);
        qb = !0
    }

    function rb(a) {
        var c = b.extend({}, a);
        a = c.core || {};
        var c = c.custom;
        if (!sb || c) {
            var d = 4;
            c = (sb = c) || {colors: [], gradients: []}
        } else d = 2;
        a.colors || (a.colors = ua);
        a.gradients || (a.gradients = va);
        for (var e = 0; e < d; e++) {
            switch (e) {
                case 0:
                    var g = "colors-core";
                    var h = a.colors;
                    break;
                case 1:
                    g = "gradients-core";
                    h = a.gradients;
                    break;
                case 2:
                    g = "colors-custom";
                    h = c.colors;
                    break;
                case 3:
                    g = "gradients-custom", h = c.gradients
            }
            var f = g;
            var k = h.slice() || [];
            for (var n = document.createDocumentFragment(), m = -1 !== f.search("core"), q = m ? "" : " rev-picker-color-custom", l = k.length, p = -1 !== f.search("colors") ? 5 : 6, l = Math.max(Math.ceil(l / 6), p), p = 0; p < l; p++)for (; k.length < 6 * (p + 1);)k[k.length] = "blank";
            l = k.length;
            for (p = 0; p < l; p++)n.appendChild(u(k[p], m, q));
            f = ["rev-cpicker-" + f, n];
            k = b("#" + f[0]);
            k.find(".rev-cpicker-color").remove();
            k.prepend(f[1])
        }
    }

    var I, z, qb, Y, ja, v, fb, ea, za, tb, fa, n, Na, J, H,
        ra, Ua, ta, ub, vb, X, D, t, N, R, Ga, f, oa, Pa, Ea, wb, xb, Ka, aa, ba, sa, Ca, la, ma, K, Va, gb, Ha, Qa, Oa, xa, ca, jb, pa, ka, P, na, M, ab, Sa, W, Q, L, nb, F, T, sb, yb, ia, m, S, ob, w, G, Wa, zb, A, Ta, ha, qa, pb, Z, E, q, Ma, La, mb, Ab, Ra, C = {}, V = {
            axis: "x",
            containment: "#rev-cpicker-point-wrap"
        }, wa = {
            color: "Color",
            solid_color: "Solid Color",
            gradient_color: "Gradient Color",
            currently_editing: "Currently Editing",
            core_presets: "Core Presets",
            custom_presets: "Custom Presets",
            enter_a_name: "Enter a Name",
            save_a_new_preset: "Save a new Preset",
            save: "Save",
            color_hex_value: "Color Hex Value",
            opacity: "Opacity",
            clear: "Clear",
            location: "Location",
            "delete": "Delete",
            horizontal: "Horizontal",
            vertical: "Vertical",
            radial: "Radial",
            enter_angle: "Enter Angle",
            reverse_gradient: "Reverse Gradient",
            delete_confirm: "Remove/Delete this custom preset color?",
            naming_error: "Please enter a unique name for the new color preset"
        }, ua = "#FFFFFF #000000 #FF3A2D #007AFF #4CD964 #FFCC00 #C7C7CC #8E8E93 #FFD3E0 #34AADC #E0F8D8 #FF9500".split(" "), va = [{0: "{&type&:&linear&,&angle&:&180&,&colors&:[{&r&:247,&g&:247,&b&:247,&a&:&1&,&position&:0,&align&:&top&},{&r&:247,&g&:247,&b&:247,&a&:&1&,&position&:0,&align&:&bottom&},{&r&:215,&g&:215,&b&:215,&a&:&1&,&position&:100,&align&:&bottom&},{&r&:215,&g&:215,&b&:215,&a&:&1&,&position&:100,&align&:&top&}]}"},
            {1: "{&type&:&linear&,&angle&:&180&,&colors&:[{&r&:74,&g&:74,&b&:74,&a&:&1&,&position&:0,&align&:&top&},{&r&:74,&g&:74,&b&:74,&a&:&1&,&position&:0,&align&:&bottom&},{&r&:43,&g&:43,&b&:43,&a&:&1&,&position&:100,&align&:&bottom&},{&r&:43,&g&:43,&b&:43,&a&:&1&,&position&:100,&align&:&top&}]}"}, {2: "{&type&:&linear&,&angle&:&180&,&colors&:[{&r&:219,&g&:221,&b&:222,&a&:&1&,&position&:0,&align&:&top&},{&r&:219,&g&:221,&b&:222,&a&:&1&,&position&:0,&align&:&bottom&},{&r&:137,&g&:140,&b&:144,&a&:&1&,&position&:100,&align&:&bottom&},{&r&:137,&g&:140,&b&:144,&a&:&1&,&position&:100,&align&:&top&}]}"},
            {3: "{&type&:&linear&,&angle&:&180&,&colors&:[{&r&:26,&g&:214,&b&:253,&a&:&1&,&position&:0,&align&:&top&},{&r&:26,&g&:214,&b&:253,&a&:&1&,&position&:0,&align&:&bottom&},{&r&:29,&g&:98,&b&:240,&a&:&1&,&position&:100,&align&:&bottom&},{&r&:29,&g&:98,&b&:240,&a&:&1&,&position&:100,&align&:&top&}]}"}, {4: "{&type&:&linear&,&angle&:&180&,&colors&:[{&r&:198,&g&:68,&b&:252,&a&:&1&,&position&:0,&align&:&top&},{&r&:198,&g&:68,&b&:252,&a&:&1&,&position&:0,&align&:&bottom&},{&r&:88,&g&:86,&b&:214,&a&:&1&,&position&:100,&align&:&bottom&},{&r&:88,&g&:86,&b&:214,&a&:&1&,&position&:100,&align&:&top&}]}"},
            {5: "{&type&:&linear&,&angle&:&180&,&colors&:[{&r&:255,&g&:94,&b&:58,&a&:&1&,&position&:0,&align&:&top&},{&r&:255,&g&:94,&b&:58,&a&:&1&,&position&:0,&align&:&bottom&},{&r&:255,&g&:42,&b&:104,&a&:&1&,&position&:100,&align&:&bottom&},{&r&:255,&g&:42,&b&:104,&a&:&1&,&position&:100,&align&:&top&}]}"}, {6: "{&type&:&linear&,&angle&:&180&,&colors&:[{&r&:228,&g&:221,&b&:202,&a&:&1&,&position&:0,&align&:&top&},{&r&:228,&g&:221,&b&:202,&a&:&1&,&position&:0,&align&:&bottom&},{&r&:214,&g&:206,&b&:195,&a&:&1&,&position&:100,&align&:&bottom&},{&r&:214,&g&:206,&b&:195,&a&:&1&,&position&:100,&align&:&top&}]}"},
            {7: "{&type&:&linear&,&angle&:&180&,&colors&:[{&r&:255,&g&:219,&b&:76,&a&:&1&,&position&:0,&align&:&top&},{&r&:255,&g&:219,&b&:76,&a&:&1&,&position&:0,&align&:&bottom&},{&r&:255,&g&:205,&b&:2,&a&:&1&,&position&:100,&align&:&bottom&},{&r&:255,&g&:205,&b&:2,&a&:&1&,&position&:100,&align&:&top&}]}"}, {8: "{&type&:&linear&,&angle&:&180&,&colors&:[{&r&:255,&g&:149,&b&:0,&a&:&1&,&position&:0,&align&:&top&},{&r&:255,&g&:149,&b&:0,&a&:&1&,&position&:0,&align&:&bottom&},{&r&:255,&g&:94,&b&:58,&a&:&1&,&position&:100,&align&:&bottom&},{&r&:255,&g&:94,&b&:58,&a&:&1&,&position&:100,&align&:&top&}]}"},
            {9: "{&type&:&linear&,&angle&:&180&,&colors&:[{&r&:82,&g&:237,&b&:199,&a&:&1&,&position&:0,&align&:&top&},{&r&:82,&g&:237,&b&:199,&a&:&1&,&position&:0,&align&:&bottom&},{&r&:90,&g&:200,&b&:251,&a&:&1&,&position&:100,&align&:&bottom&},{&r&:90,&g&:200,&b&:251,&a&:&1&,&position&:100,&align&:&top&}]}"}, {10: "{&type&:&linear&,&angle&:&180&,&colors&:[{&r&:228,&g&:183,&b&:240,&a&:&1&,&position&:0,&align&:&top&},{&r&:228,&g&:183,&b&:240,&a&:&1&,&position&:0,&align&:&bottom&},{&r&:200,&g&:110,&b&:223,&a&:&1&,&position&:100,&align&:&bottom&},{&r&:200,&g&:110,&b&:223,&a&:&1&,&position&:100,&align&:&top&}]}"},
            {11: "{&type&:&linear&,&angle&:&180&,&colors&:[{&r&:135,&g&:252,&b&:112,&a&:&1&,&position&:0,&align&:&top&},{&r&:135,&g&:252,&b&:112,&a&:&1&,&position&:0,&align&:&bottom&},{&r&:11,&g&:211,&b&:24,&a&:&1&,&position&:100,&align&:&bottom&},{&r&:11,&g&:211,&b&:24,&a&:&1&,&position&:100,&align&:&top&}]}"}, {12: "{&type&:&linear&,&angle&:&180&,&colors&:[{&r&:61,&g&:78,&b&:129,&a&:&1&,&position&:0,&align&:&top&},{&r&:61,&g&:78,&b&:129,&a&:&1&,&position&:0,&align&:&bottom&},{&r&:87,&g&:83,&b&:201,&a&:&1&,&position&:50,&align&:&bottom&},{&r&:110,&g&:127,&b&:243,&a&:&1&,&position&:100,&align&:&bottom&},{&r&:110,&g&:127,&b&:243,&a&:&1&,&position&:100,&align&:&top&}]}"},
            {13: "{&type&:&linear&,&angle&:&160&,&colors&:[{&r&:35,&g&:21,&b&:87,&a&:&1&,&position&:0,&align&:&top&},{&r&:35,&g&:21,&b&:87,&a&:&1&,&position&:0,&align&:&bottom&},{&r&:68,&g&:16,&b&:122,&a&:&1&,&position&:29,&align&:&bottom&},{&r&:255,&g&:19,&b&:97,&a&:&1&,&position&:67,&align&:&bottom&},{&r&:255,&g&:248,&b&:0,&a&:&1&,&position&:100,&align&:&bottom&},{&r&:255,&g&:248,&b&:0,&a&:&1&,&position&:100,&align&:&top&}]}"}, {14: "{&type&:&linear&,&angle&:&160&,&colors&:[{&r&:105,&g&:234,&b&:203,&a&:&1&,&position&:0,&align&:&top&},{&r&:105,&g&:234,&b&:203,&a&:&1&,&position&:0,&align&:&bottom&},{&r&:234,&g&:204,&b&:248,&a&:&1&,&position&:50,&align&:&bottom&},{&r&:102,&g&:84,&b&:241,&a&:&1&,&position&:100,&align&:&bottom&},{&r&:102,&g&:84,&b&:241,&a&:&1&,&position&:100,&align&:&top&}]}"},
            {15: "{&type&:&linear&,&angle&:&160&,&colors&:[{&r&:255,&g&:5,&b&:124,&a&:&1&,&position&:0,&align&:&top&},{&r&:255,&g&:5,&b&:124,&a&:&1&,&position&:0,&align&:&bottom&},{&r&:124,&g&:100,&b&:213,&a&:&1&,&position&:50,&align&:&bottom&},{&r&:76,&g&:195,&b&:255,&a&:&1&,&position&:100,&align&:&bottom&},{&r&:76,&g&:195,&b&:255,&a&:&1&,&position&:100,&align&:&top&}]}"}, {16: "{&type&:&linear&,&angle&:&160&,&colors&:[{&r&:255,&g&:5,&b&:124,&a&:&1&,&position&:0,&align&:&top&},{&r&:255,&g&:5,&b&:124,&a&:&1&,&position&:0,&align&:&bottom&},{&r&:141,&g&:11,&b&:147,&a&:&1&,&position&:50,&align&:&bottom&},{&r&:50,&g&:21,&b&:117,&a&:&1&,&position&:100,&align&:&bottom&},{&r&:50,&g&:21,&b&:117,&a&:&1&,&position&:100,&align&:&top&}]}"},
            {17: "{&type&:&linear&,&angle&:&160&,&colors&:[{&r&:164,&g&:69,&b&:178,&a&:&1&,&position&:0,&align&:&top&},{&r&:164,&g&:69,&b&:178,&a&:&1&,&position&:0,&align&:&bottom&},{&r&:212,&g&:24,&b&:114,&a&:&1&,&position&:50,&align&:&bottom&},{&r&:255,&g&:0,&b&:102,&a&:&1&,&position&:100,&align&:&bottom&},{&r&:255,&g&:0,&b&:102,&a&:&1&,&position&:100,&align&:&top&}]}"}, {18: "{&type&:&linear&,&angle&:&160&,&colors&:[{&r&:158,&g&:251,&b&:211,&a&:&1&,&position&:0,&align&:&top&},{&r&:158,&g&:251,&b&:211,&a&:&1&,&position&:0,&align&:&bottom&},{&r&:87,&g&:233,&b&:242,&a&:&1&,&position&:50,&align&:&bottom&},{&r&:69,&g&:212,&b&:251,&a&:&1&,&position&:100,&align&:&bottom&},{&r&:69,&g&:212,&b&:251,&a&:&1&,&position&:100,&align&:&top&}]}"},
            {19: "{&type&:&linear&,&angle&:&160&,&colors&:[{&r&:172,&g&:50,&b&:228,&a&:&1&,&position&:0,&align&:&top&},{&r&:172,&g&:50,&b&:228,&a&:&1&,&position&:0,&align&:&bottom&},{&r&:121,&g&:24,&b&:242,&a&:&1&,&position&:50,&align&:&bottom&},{&r&:72,&g&:1,&b&:255,&a&:&1&,&position&:100,&align&:&bottom&},{&r&:72,&g&:1,&b&:255,&a&:&1&,&position&:100,&align&:&top&}]}"}, {20: "{&type&:&linear&,&angle&:&160&,&colors&:[{&r&:112,&g&:133,&b&:182,&a&:&1&,&position&:0,&align&:&top&},{&r&:112,&g&:133,&b&:182,&a&:&1&,&position&:0,&align&:&bottom&},{&r&:135,&g&:167,&b&:217,&a&:&1&,&position&:50,&align&:&bottom&},{&r&:222,&g&:243,&b&:248,&a&:&1&,&position&:100,&align&:&bottom&},{&r&:222,&g&:243,&b&:248,&a&:&1&,&position&:100,&align&:&top&}]}"},
            {21: "{&type&:&linear&,&angle&:&160&,&colors&:[{&r&:34,&g&:225,&b&:255,&a&:&1&,&position&:0,&align&:&top&},{&r&:34,&g&:225,&b&:255,&a&:&1&,&position&:0,&align&:&bottom&},{&r&:29,&g&:143,&b&:225,&a&:&1&,&position&:50,&align&:&bottom&},{&r&:98,&g&:94,&b&:177,&a&:&1&,&position&:100,&align&:&bottom&},{&r&:98,&g&:94,&b&:177,&a&:&1&,&position&:100,&align&:&top&}]}"}, {22: "{&type&:&linear&,&angle&:&160&,&colors&:[{&r&:44,&g&:216,&b&:213,&a&:&1&,&position&:0,&align&:&top&},{&r&:44,&g&:216,&b&:213,&a&:&1&,&position&:0,&align&:&bottom&},{&r&:107,&g&:141,&b&:214,&a&:&1&,&position&:50,&align&:&bottom&},{&r&:142,&g&:55,&b&:215,&a&:&1&,&position&:100,&align&:&bottom&},{&r&:142,&g&:55,&b&:215,&a&:&1&,&position&:100,&align&:&top&}]}"},
            {23: "{&type&:&linear&,&angle&:&160&,&colors&:[{&r&:44,&g&:216,&b&:213,&a&:&1&,&position&:0,&align&:&top&},{&r&:44,&g&:216,&b&:213,&a&:&1&,&position&:0,&align&:&bottom&},{&r&:197,&g&:193,&b&:255,&a&:&1&,&position&:56,&align&:&bottom&},{&r&:255,&g&:186,&b&:195,&a&:&1&,&position&:100,&align&:&bottom&},{&r&:255,&g&:186,&b&:195,&a&:&1&,&position&:100,&align&:&top&}]}"}, {24: "{&type&:&linear&,&angle&:&180&,&colors&:[{&r&:191,&g&:217,&b&:254,&a&:&1&,&position&:0,&align&:&bottom&},{&r&:191,&g&:217,&b&:254,&a&:&1&,&position&:0,&align&:&top&},{&r&:223,&g&:137,&b&:181,&a&:&1&,&position&:100,&align&:&top&},{&r&:223,&g&:137,&b&:181,&a&:&1&,&position&:100,&align&:&bottom&}]}"},
            {25: "{&type&:&linear&,&angle&:&340&,&colors&:[{&r&:97,&g&:97,&b&:97,&a&:&1&,&position&:0,&align&:&bottom&},{&r&:97,&g&:97,&b&:97,&a&:&1&,&position&:0,&align&:&top&},{&r&:155,&g&:197,&b&:195,&a&:&1&,&position&:100,&align&:&top&},{&r&:155,&g&:197,&b&:195,&a&:&1&,&position&:100,&align&:&bottom&}]}"}, {26: "{&type&:&linear&,&angle&:&90&,&colors&:[{&r&:36,&g&:57,&b&:73,&a&:&1&,&position&:0,&align&:&bottom&},{&r&:36,&g&:57,&b&:73,&a&:&1&,&position&:0,&align&:&top&},{&r&:81,&g&:127,&b&:164,&a&:&1&,&position&:100,&align&:&top&},{&r&:81,&g&:127,&b&:164,&a&:&1&,&position&:100,&align&:&bottom&}]}"},
            {27: "{&type&:&linear&,&angle&:&180&,&colors&:[{&r&:234,&g&:205,&b&:163,&a&:&1&,&position&:0,&align&:&top&},{&r&:234,&g&:205,&b&:163,&a&:&1&,&position&:0,&align&:&bottom&},{&r&:230,&g&:185,&b&:128,&a&:&1&,&position&:100,&align&:&bottom&},{&r&:230,&g&:185,&b&:128,&a&:&1&,&position&:100,&align&:&top&}]}"}, {28: "{&type&:&linear&,&angle&:&45&,&colors&:[{&r&:238,&g&:156,&b&:167,&a&:&1&,&position&:0,&align&:&top&},{&r&:238,&g&:156,&b&:167,&a&:&1&,&position&:0,&align&:&bottom&},{&r&:255,&g&:221,&b&:225,&a&:&1&,&position&:100,&align&:&bottom&},{&r&:255,&g&:221,&b&:225,&a&:&1&,&position&:100,&align&:&top&}]}"},
            {29: "{&type&:&linear&,&angle&:&340&,&colors&:[{&r&:247,&g&:148,&b&:164,&a&:&1&,&position&:0,&align&:&top&},{&r&:247,&g&:148,&b&:164,&a&:&1&,&position&:0,&align&:&bottom&},{&r&:253,&g&:214,&b&:189,&a&:&1&,&position&:100,&align&:&bottom&},{&r&:253,&g&:214,&b&:189,&a&:&1&,&position&:100,&align&:&top&}]}"}, {30: "{&type&:&linear&,&angle&:&45&,&colors&:[{&r&:135,&g&:77,&b&:162,&a&:&1&,&position&:0,&align&:&top&},{&r&:135,&g&:77,&b&:162,&a&:&1&,&position&:0,&align&:&bottom&},{&r&:196,&g&:58,&b&:48,&a&:&1&,&position&:100,&align&:&bottom&},{&r&:196,&g&:58,&b&:48,&a&:&1&,&position&:100,&align&:&top&}]}"},
            {31: "{&type&:&linear&,&angle&:&180&,&colors&:[{&r&:243,&g&:231,&b&:233,&a&:&1&,&position&:0,&align&:&bottom&},{&r&:243,&g&:231,&b&:233,&a&:&1&,&position&:0,&align&:&top&},{&r&:218,&g&:212,&b&:236,&a&:&1&,&position&:100,&align&:&top&},{&r&:218,&g&:212,&b&:236,&a&:&1&,&position&:100,&align&:&bottom&}]}"}, {32: "{&type&:&linear&,&angle&:&320&,&colors&:[{&r&:43,&g&:88,&b&:118,&a&:&1&,&position&:0,&align&:&bottom&},{&r&:43,&g&:88,&b&:118,&a&:&1&,&position&:0,&align&:&top&},{&r&:78,&g&:67,&b&:118,&a&:&1&,&position&:100,&align&:&top&},{&r&:78,&g&:67,&b&:118,&a&:&1&,&position&:100,&align&:&bottom&}]}"},
            {33: "{&type&:&linear&,&angle&:&60&,&colors&:[{&r&:41,&g&:50,&b&:60,&a&:&1&,&position&:0,&align&:&bottom&},{&r&:41,&g&:50,&b&:60,&a&:&1&,&position&:0,&align&:&top&},{&r&:72,&g&:85,&b&:99,&a&:&1&,&position&:100,&align&:&top&},{&r&:72,&g&:85,&b&:99,&a&:&1&,&position&:100,&align&:&bottom&}]}"}, {34: "{&type&:&linear&,&angle&:&180&,&colors&:[{&r&:233,&g&:233,&b&:231,&a&:&1&,&position&:0,&align&:&top&},{&r&:233,&g&:233,&b&:231,&a&:&1&,&position&:0,&align&:&bottom&},{&r&:239,&g&:238,&b&:236,&a&:&1&,&position&:25,&align&:&bottom&},{&r&:238,&g&:238,&b&:238,&a&:&1&,&position&:70,&align&:&bottom&},{&r&:213,&g&:212,&b&:208,&a&:&1&,&position&:100,&align&:&bottom&},{&r&:213,&g&:212,&b&:208,&a&:&1&,&position&:100,&align&:&top&}]}"},
            {35: "{&type&:&linear&,&angle&:&180&,&colors&:[{&r&:251,&g&:200,&b&:212,&a&:&1&,&position&:0,&align&:&bottom&},{&r&:251,&g&:200,&b&:212,&a&:&1&,&position&:0,&align&:&top&},{&r&:151,&g&:149,&b&:240,&a&:&1&,&position&:100,&align&:&top&},{&r&:151,&g&:149,&b&:240,&a&:&1&,&position&:100,&align&:&bottom&}]}"}];
    b.tpColorPicker = function (a) {
        Y || (Y = b("body"), n = b('<div class="rev-cpicker-wrap color-view"><div id="rev-cpicker-back" class="rev-cpicker-close"></div><div id="rev-cpicker"><div id="rev-cpicker-head"><div id="rev-cpicker-drag" class="rev-cpicker-draggable"></div><span id="rev-cpicker-color-btn" class="rev-cpicker-main-btn" data-text="solid_color"></span><span id="rev-cpicker-gradient-btn" class="rev-cpicker-main-btn" data-text="gradient_color"></span><div id="rev-cpicker-editing" class="rev-cpicker-draggable"><span id="rev-cpicker-edit-title" data-text="currently_editing"></span><span id="rev-cpicker-current-edit"></span></div><span id="rev-cpicker-exit" class="rev-cpicker-close"></span></div><div id="rev-cpicker-section-left" class="rev-cpicker-section"><div id="rev-cpicker-body"><div id="rev-cpicker-colors" class="rev-cpicker-type"><div class="rev-cpicker-column rev-cpicker-column-left">\t<div class="rev-cpicker-column-inner-left"><div class="rev-cpicker-presets"><span id="rev-cpicker-colors-core-btn" class="rev-cpicker-preset-title rev-cpicker-preset-title-core selected"><span data-text="core_presets"></span> <span class="rev-cpicker-arrow rev-cpicker-arrow-down"></span><span class="rev-cpicker-arrow rev-cpicker-arrow-up"></span></span><span id="rev-cpicker-colors-custom-btn" class="rev-cpicker-preset-title rev-cpicker-preset-title-custom"><span data-text="custom_presets"></span> <span class="rev-cpicker-arrow rev-cpicker-arrow-down"></span><span class="rev-cpicker-arrow rev-cpicker-arrow-up"></span></span><div id="rev-cpicker-colors-core" class="rev-cpicker-presets-group"></div><div id="rev-cpicker-colors-custom" class="rev-cpicker-presets-group rev-cpicker-presets-custom"></div></div><div class="rev-cpicker-iris"><input id="rev-cpicker-iris-color" class="rev-cpicker-iris-input" value="#ffffff" /><div id="rev-cpicker-scroller" class="iris-slider iris-strip"><div id="rev-cpicker-scroll-bg"></div><div id="rev-cpicker-scroll" class="iris-slider-offset"></div></div></div></div></div><div class="rev-cpicker-column rev-cpicker-column-right"><div class="rev-cpicker-column-inner-right"><div><span data-text="save_a_new_preset"></span><div class="rev-cpicker-presets-save-as"><input type="text" class="rev-cpicker-preset-save" placeholder="" data-placeholder="enter_a_name" /><span class="rev-cpicker-btn rev-cpicker-save-preset-btn" data-alert="naming_error"><span class="rev-cpicker-save-icon"></span><span class="rev-cpicker-preset-save-text" data-text="save"></span></span></div></div><div class="rev-cpicker-meta"><span data-text="color_hex_value"></span><br><input type="text" id="rev-cpicker-color-hex" class="rev-cpicker-input rev-cpicker-hex" value="#ffffff" /><br><span data-text="opacity" class="rev-cpicker-hideable"></span><br><input type="text" id="rev-cpicker-color-opacity" class="rev-cpicker-input rev-cpicker-opacity-input rev-cpicker-hideable" value="100%" /><span id="rev-cpciker-clear-hex" class="rev-cpicker-btn rev-cpicker-btn-small rev-cpciker-clear rev-cpicker-hideable" data-text="clear"></span></div></div></div></div><div id="rev-cpicker-gradients" class="rev-cpicker-type"><div class="rev-cpicker-column rev-cpicker-column-left">\t<div class="rev-cpicker-column-inner-left"><div class="rev-cpicker-presets"><span id="rev-cpicker-gradients-core-btn" class="rev-cpicker-preset-title rev-cpicker-preset-title-core selected"><span data-text="core_presets"></span> <span class="rev-cpicker-arrow rev-cpicker-arrow-down"></span><span class="rev-cpicker-arrow rev-cpicker-arrow-up"></span></span><span id="rev-cpicker-gradients-custom-btn" class="rev-cpicker-preset-title rev-cpicker-preset-title-custom"><span data-text="custom_presets"></span> <span class="rev-cpicker-arrow rev-cpicker-arrow-down"></span><span class="rev-cpicker-arrow rev-cpicker-arrow-up"></span></span><div id="rev-cpicker-gradients-core" class="rev-cpicker-presets-group"></div><div id="rev-cpicker-gradients-custom" class="rev-cpicker-presets-group rev-cpicker-presets-custom"></div></div><div class="rev-cpicker-gradient-block"><div id="rev-cpicker-gradient-input" class="rev-cpicker-gradient-builder"><span id="rev-cpicker-hit-top" class="rev-cpicker-builder-hit"></span><div id="rev-cpicker-point-wrap"><div id="rev-cpciker-point-container"></div></div><span id="rev-cpicker-hit-bottom" class="rev-cpicker-builder-hit"></span></div><div class="rev-cpicker-meta-row-wrap"><div class="rev-cpicker-meta-row"><div><label data-text="opacity"></label><input type="text" id="rev-cpicker-grad-opacity" class="rev-cpicker-point-input rev-cpicker-opacity-input" value="100%" disabled /></div><div><label data-text="location"></label><input type="text" id="rev-cpicker-opacity-location" class="rev-cpicker-point-input rev-cpicker-point-location" value="100%" disabled /></div><div><label>&nbsp;</label><span class="rev-cpicker-btn rev-cpicker-btn-small rev-cpicker-point-delete" id="rev-cpicker-opacity-delete" data-text="delete">{{delete}}</span></div></div><div class="rev-cpicker-meta-row"><div><label data-text="color"></label><span class="rev-cpicker-point-input" id="rev-cpicker-color-box"></span></div><div><label data-text="location"></label><input type="text" id="rev-cpicker-color-location" class="rev-cpicker-point-input rev-cpicker-point-location" value="100%" disabled /></div><div><label>&nbsp;</label><span class="rev-cpicker-btn rev-cpicker-btn-small rev-cpicker-point-input rev-cpicker-point-delete" id="rev-cpicker-color-delete" data-text="delete">{{delete}}</span></div></div></div></div></div></div><div class="rev-cpicker-column rev-cpicker-column-right"><div class="rev-cpicker-column-inner-right"><div><span data-text="save_a_new_preset"></span><div class="rev-cpicker-presets-save-as"><input type="text" class="rev-cpicker-preset-save" placeholder="" data-placeholder="enter_a_name" /><span class="rev-cpicker-btn rev-cpicker-save-preset-btn" data-alert="naming_error"><span class="rev-cpicker-save-icon"></span><span class="rev-cpicker-preset-save-text" data-text="save"></span></span></div></div><div class="rev-cpicker-gradient-block"><div id="rev-cpicker-gradient-output" class="rev-cpicker-gradient-builder"></div></div><div class="rev-cpicker-meta-row-wrap"><div class="rev-cpicker-meta-row"><div><label>Orientation</label><span id="rev-cpicker-orientation-horizontal" class="rev-cpicker-btn rev-cpicker-btn-small rev-cpicker-orientation" data-direction="90" data-text="horizontal"></span><span id="rev-cpicker-orientation-vertical" class="rev-cpicker-btn rev-cpicker-btn-small rev-cpicker-orientation" data-direction="180" data-text="vertical"></span><span id="rev-cpicker-orientation-radial" class="rev-cpicker-btn rev-cpicker-btn-small rev-cpicker-orientation" data-direction="radial" data-text="radial"></span></div></div><div class="rev-cpicker-meta-row rev-cpicker-meta-row-push"><div><label data-text="enter_angle"></label><div id="rev-cpicker-angle-container"><input type="text" class="rev-cpicker-input" id="rev-cpicker-meta-angle" value="" /><div id="rev-cpicker-wheel"><div id="rev-cpicker-wheel-inner"><span id="rev-cpicker-wheel-point"></span></div></div></div></div><div><label data-text="reverse_gradient"></label><span id="rev-cpicker-meta-reverse"></span></div></div></div></div></div></div></div></div><span id="rev-cpicker-check"></span><div id="rev-cpicker-section-right" class="rev-cpicker-section"><div class="rev-cpicker-iris"><input id="rev-cpicker-iris-gradient" class="rev-cpicker-iris-input" value="#ffffff" /></div><div class="rev-cpicker-fields"><input type="text" id="rev-cpicker-gradient-hex" class="rev-cpicker-input rev-cpicker-hex" value="#ffffff" /><span id="rev-cpciker-clear-gradient" class="rev-cpicker-btn rev-cpicker-btn-small rev-cpciker-clear" data-text="clear"></span><span id="rev-cpicker-check-gradient" class="rev-cpicker-btn"></span></div></div><span id="rev-cpicker-remove-delete" data-text="delete_confirm"></span></div></div>').appendTo(Y));
        a || (a = {});
        a.core && (a.core.colors && (ua = a.core.colors), a.core.gradients && (va = a.core.gradients));
        rb(a);
        Na ? (S.perfectScrollbar("update"), a.mode && (Ua = a.mode), a.language && B(a.language)) : (B(a.language || wa), Ua = a.mode || "full");
        a.init && (tb = a.init);
        a.onAjax && (vb = a.onAjax);
        a.onEdit && (ub = a.onEdit);
        a.change && (xb = a.change);
        a.cancel && (wb = a.cancel);
        a.widgetId && (yb = a.widgetId);
        a.defaultValue && (RevColor.defaultValue = a.defaultValue);
        a.wrapClasses && (Ab = a.wrapClasses);
        a.appendedHtml && (zb = a.appendedHtml);
        Na = !0
    };
    var Ib =
    {
        refresh: function () {
            var a = b(this);
            if (a.hasClass("rev-cpicker-component")) {
                var c = a.data("revcp") || {}, c = a.val() || c.defaultValue || RevColor.defaultValue, d = RevColor.process(c), c = d[0], d = "rgba" === d[1] && RevColor.transparentRgba(c, !0) ? "" : c;
                "transparent" !== c ? a.data("tpcp")[0].style.background = d : a.data("tpcp").css("background", "");
                a.attr("data-color", c).data("hex", c)
            }
        }, destroy: function () {
        b(this).removeData().closest(".rev-cpicker-master-wrap").removeData().remove()
    }
    };
    b.fn.tpColorPicker = function (a) {
        return a &&
        "string" === typeof a ? this.each(Ib[a]) : this.each(function () {
            var c = b(this);
            if (c.hasClass("rev-cpicker-component"))c.tpColorPicker("refresh"); else {
                var d = b('<span class="rev-colorpicker"></span>').data("revcolorinput", c), e = b('<span class="rev-colorbox" />'), g = b('<span class="rev-colorbtn" />'), h = c.attr("data-wrap-classes"), f = c.attr("data-wrapper"), k = c.attr("data-wrap-id"), n = c.attr("data-title"), m = c.attr("data-skin"), l = c.val();
                d.insertBefore(c).append([e, g, c]);
                if (a && b.isPlainObject(a)) {
                    f || (f = a.wrapper);
                    h || (h = a.wrapClasses);
                    m || (m = a.skin);
                    k || (k = a.wrapId);
                    n || (n = a.title);
                    var p = a.defaultValue;
                    var q = c.data("revcp");
                    q && (a = b.extend({}, q, a));
                    c.data("revcp", a)
                }
                h || (h = Ab);
                h && d.addClass(h);
                k && d.attr("id", k);
                l || (l = p || RevColor.defaultValue, c.val(l));
                h = RevColor.process(l);
                l = h[0];
                h = "rgba" === h[1] && RevColor.transparentRgba(l, !0) ? "" : l;
                "transparent" !== h && (e[0].style.background = h);
                g[0].innerHTML = n || Va || wa.color;
                c.attr({type: "hidden", "data-color": l}).data("tpcp", e).addClass("rev-cpicker-component");
                m && d.addClass(m);
                f ?
                    (f = b(f).addClass("rev-cpicker-master-wrap"), d.wrap(f)) : d.addClass("rev-cpicker-master-wrap");
                (e = a ? a.init || tb : !1) && e(d, c, l, a)
            }
        })
    };
    b(function () {
        b("body").on("click.revcpicker", ".rev-colorpicker", function () {
            qb || Hb();
            m = b(this).data("revcolorinput");
            var a = m.attr("data-widget-id"), c = m.attr("data-appended-html"), d = m.attr("data-editing"), e = m.attr("data-colors"), g = m.attr("data-mode"), f = m.data("revcp"), k = m.attr("data-lang"), l;
            if (e) {
                e = JSON.parse(e.replace(/\&/g, '"'));
                if (e.colors)var p = e.colors;
                if (e.gradients)var q =
                    e.gradients
            }
            if (f) {
                if (l = f.colors) {
                    if (l.core) {
                        var t = l.core.colors;
                        var u = l.core.gradients
                    }
                    if (l.custom) {
                        var v = l.custom.colors;
                        var w = l.custom.gradients
                    }
                }
                var x = f.onEdit;
                var z = f.onAjax;
                l = f.change;
                var C = f.cancel;
                k || (k = f.lang);
                g || (g = f.mode);
                c || (c = f.appendedHtml);
                d || (d = f.editing);
                a || (a = f.widgetId)
            }
            if (u || t || w || v || q || p) {
                f = {};
                if (u || t || q || p)f.core = {colors: p || t || ua, gradients: q || u || va};
                if (w || v)f.custom = {colors: v || ua, gradients: w || va};
                rb(f)
            }
            a || (a = yb);
            a && (n[0].id = a);
            c || (c = zb);
            c && (oa = b(c).appendTo(Z));
            k && B(k);
            g || (g =
                Ua);
            d ? Oa.style.visibility = "visible" : (d = "", Oa.style.visibility = "hidden");
            mb.innerHTML = d;
            "single" === g || "basic" === g ? (ja = !1, H.hide(), D.show(), "basic" === g && n.addClass("is-basic")) : (ja = !0, H.show(), D.show());
            a = m.val() || m.attr("data-color") || RevColor.defaultValue;
            1 < a.split("||").length && (a = RevColor.joinToRgba(a), m.val(a));
            a = ya(a);
            G = a[0];
            za = x || ub;
            fa = z || vb;
            Ea = C || wb;
            Ra = l || xb;
            "gradient" !== a[1] ? D.data("state", G) : H.data("state", G);
            Y.addClass("rev-colorpicker-open");
            A = m.data("tpcp");
            n.data("revcpickerinput", m).addClass("active").show();
            S.each(Fa).perfectScrollbar("update");
            Wa = m.attr("data-color");
            ia = m.data("hex");
            b(".rev-cpicker-color").not(".blank").each(y)
        })
    })
})("undefined" !== jQuery ? jQuery : !1);