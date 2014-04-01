//index.js

function respondentPortalInit() {
	var portal = new respondentPortal();
    portal.setResponsiveMenu("#navigation", 480);
}

function respondentPortal(navigationElement) {
    var viewport = window.innerWidth;
    this.viewport = viewport;
    var navigationElement;
    navigationElement = $(navigationElement).html();
    this.getViewport = function () {
        this.viewport = window.innerWidth;
    }
    this.setResponsiveMenu = function (navObj, maxViewportForDropdown) {
        var nav;
        nav = navObj;
        var menuItems = new Array();
        menuItems.push("Home");
        if (viewport < maxViewportForDropdown) {
            console.log("[page] Viewport is " + viewport + ", enabling.");
            var renderedSelectList;
            for (var i = 0; i < menuItems.length; i++) {
                if (i == 0) {
                    renderedSelectList = "<select id='jNavList' onblur='portal.redirectToPage()'>";
                }
                renderedSelectList = renderedSelectList + "<option id='" + i + "'>" + menuItems[i] + "</option>";
                if (i == menuItems.count - 1) {
                    renderedSelectList = renderedSelectList + "</select>";
                }
            }
            $(nav).html(renderedSelectList);
        } else {
            console.log("[page] Viewport is " + viewport + ", using html.");
            $(nav).html(navigationElement);
        }
    };
    this.redirectToPage =function () {
        console.log("[header.js] evt: redirectToPage");
        var homeIndex = "../home/index";
        var dropDownValue = $("#jNavList").val();
        navigationDestinations[0] = homeIndex;
        window.location.replace(navigationDestinations[dropDownValue]);
        return;
    }
}
