! function(o) {
    o.lightbox || (o.lightbox = {}), o.lightbox.elements = void 0, o.lightbox.data = void 0, o.lightbox.dom = void 0, o.lightbox.maxDimensions = void 0, o.lightbox.fn = {
        getElements: function() {
            o.lightbox.elements = o("[data-lightbox]")
        },
        createDom: function() {
            o.lightbox.dom = {}, o.lightbox.dom.lightbox = o('<div id="lightbox"></div>'), o.lightbox.dom.lightbox.bg = o('<div class="lightbox_bg"></div>').appendTo(o.lightbox.dom.lightbox), o.lightbox.dom.lightbox.container = o('<div class="lightbox_container"></div>').appendTo(o.lightbox.dom.lightbox), o.lightbox.dom.lightbox.container.window = o('<div class="lightbox_window"></div>').appendTo(o.lightbox.dom.lightbox.container), o.lightbox.dom.lightbox.container.window.frame = o('<div class="lightbox_frame"></div>').appendTo(o.lightbox.dom.lightbox.container.window), o.lightbox.dom.lightbox.container.window.frame.img = o("<img>").appendTo(o.lightbox.dom.lightbox.container.window.frame), o.lightbox.dom.lightbox.nav = o('<div class="lightbox_nav"></div>'), o.lightbox.dom.lightbox.ajax = o('<div class="lightbox_ajax"></div>').appendTo(o.lightbox.dom.lightbox.container.window), o.lightbox.dom.lightbox.buttons = {}, o.lightbox.dom.lightbox.buttons.close = o('<button class="lightbox_close"><span class="icon"></span><span class="text">Close</span></button>').appendTo(o.lightbox.dom.lightbox.container.window.frame), o.lightbox.dom.lightbox.buttons.previous = o('<button class="lightbox_previous"><span class="icon"></span><span class="text">Previous</span></button>').appendTo(o.lightbox.dom.lightbox.nav), o.lightbox.dom.lightbox.buttons.next = o('<button class="lightbox_next"><span class="icon"></span><span class="text">Next</span></button>').appendTo(o.lightbox.dom.lightbox.nav), o.lightbox.dom.lightbox.appendTo("body")
        },
        createBinds: function() {
            o.lightbox.elements.on("click", function(t) {
                t.preventDefault();
                var i = o(this);
                o.lightbox.fn.getData(i), o.lightbox.fn.doNav(), o.lightbox.fn.createNavBinds(), o.lightbox.fn.showLightbox(), o.lightbox.fn.showAjaxLoader(), o.lightbox.fn.loadImg(), o.lightbox.fn.getMaxDimensions(), o.lightbox.fn.setMaxDimensions()
            }), o.lightbox.dom.lightbox.container.window.frame.img.on("load", function() {
                o.lightbox.data.current.loaded = !0, o.lightbox.fn.showButtonClose(), o.lightbox.fn.hideAjaxLoader(), o.lightbox.fn.showImg()
            })
        },
        createNavBinds: function() {
            o.lightbox.dom.lightbox.buttons.previous.off().on("click", function(t) {
                o.lightbox.fn.changeImage("previous")
            }), o.lightbox.dom.lightbox.buttons.next.off().on("click", function(t) {
                o.lightbox.fn.changeImage("next")
            }), o.lightbox.dom.lightbox.buttons.close.off().on("click", function(t) {
                o.lightbox.fn.closeLightbox()
            })
        },
        getData: function(t) {
            o.lightbox.data || (o.lightbox.data = {}), o.lightbox.data.current = {}, o.lightbox.data.current.href = t.attr("href"), o.lightbox.data.group = {}, o.lightbox.data.group.name = "" == t.data("lightbox") ? void 0 : t.data("lightbox"), o.lightbox.data.group.elements = o.lightbox.elements.map(function(t, i) {
                return o(i).data("lightbox") == o.lightbox.data.group.name ? i : void 0
            }), o.lightbox.data.group.elements.map(function(t, i) {
                o(i).attr("href") == o.lightbox.data.current.href && (o.lightbox.data.current.index = t)
            })
        },
        changeImage: function(t) {
            "previous" == t ? o.lightbox.data.current.index = 0 == o.lightbox.data.current.index ? o.lightbox.data.group.elements.length - 1 : o.lightbox.data.current.index - 1 : "next" == t && (o.lightbox.data.current.index = o.lightbox.data.current.index == o.lightbox.data.group.elements.length - 1 ? 0 : o.lightbox.data.current.index + 1), o.lightbox.data.current.href = o.lightbox.data.group.elements[o.lightbox.data.current.index].href, o.lightbox.fn.hideButtonClose(), o.lightbox.fn.hideImg(), o.lightbox.fn.removeImg(), o.lightbox.fn.showAjaxLoader(), o.lightbox.fn.loadImg()
        },
        doNav: function() {
            o.lightbox.data.group.elements.length > 1 ? o.lightbox.fn.insertNav() : o.lightbox.fn.removeNav()
        },
        insertNav: function() {
            o.lightbox.dom.lightbox.nav.insertBefore(o.lightbox.dom.lightbox.container)
        },
        removeNav: function() {
            o.lightbox.dom.lightbox.nav.remove()
        },
        showImg: function() {
            o.lightbox.dom.lightbox.container.window.frame.img.addClass("visible")
        },
        hideImg: function() {
            o.lightbox.dom.lightbox.container.window.frame.img.removeClass("visible")
        },
        removeImg: function() {
            o.lightbox.dom.lightbox.container.window.frame.img.attr("src", ""), o.lightbox.data.current.loaded = !1
        },
        loadImg: function() {
            o.lightbox.dom.lightbox.container.window.frame.img.attr("src", o.lightbox.data.current.href)
        },
        getMaxDimensions: function() {
            o.lightbox.maxDimensions || (o.lightbox.maxDimensions = {}), o.lightbox.maxDimensions.width = Math.floor(o.lightbox.dom.lightbox.container.window.width()), o.lightbox.maxDimensions.height = Math.floor(o.lightbox.dom.lightbox.container.window.height())
        },
        setMaxDimensions: function() {
            o.lightbox.dom.lightbox.container.window.frame.img.css({
                "max-width": o.lightbox.maxDimensions.width + "px",
                "max-height": o.lightbox.maxDimensions.height + "px"
//                   "min-width" : "100%",
//                   "min-height" : "100%",
//                   "object-fit" : "contain"
            })
        },
        showLightbox: function() {
            o.lightbox.dom.lightbox.addClass("visible")
        },
        hideLightbox: function() {
            o.lightbox.dom.lightbox.removeClass("visible")
        },
        closeLightbox: function() {
            o.lightbox.fn.hideImg(), o.lightbox.fn.hideButtonClose(), o.lightbox.fn.removeImg(), o.lightbox.fn.hideLightbox()
        },
        showButtonClose: function() {
            o.lightbox.dom.lightbox.buttons.close.addClass("visible")
        },
        hideButtonClose: function() {
            o.lightbox.dom.lightbox.buttons.close.removeClass("visible")
        },
        showAjaxLoader: function() {
            o.lightbox.dom.lightbox.ajax.addClass("visible")
        },
        hideAjaxLoader: function() {
            o.lightbox.dom.lightbox.ajax.removeClass("visible")
        }
    }, o.lightbox.init = function() {
        o.lightbox.fn.getElements(), o.lightbox.fn.createDom(), o.lightbox.fn.createBinds(), o(window).on("resize", function(t) {
            o.lightbox.fn.getMaxDimensions(), o.lightbox.fn.setMaxDimensions()
        })
    }()
}(jQuery);