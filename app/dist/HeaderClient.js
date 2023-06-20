"use client";
"use strict";
exports.__esModule = true;
var image_1 = require("next/image");
var link_1 = require("next/link");
var react_1 = require("react");
var react_2 = require("next-auth/react");
var cg_1 = require("react-icons/cg");
var react_3 = require("next-auth/react");
var is_mounted_1 = require("../hooks/is-mounted");
var HeaderClient = function () {
    var _a;
    var _b = react_3.useSession(), session = _b.data, status = _b.status;
    var _c = react_1.useState(false), open = _c[0], setOpen = _c[1];
    var isMounted = is_mounted_1.useIsMounted();
    var _d = react_1.useState(false), isScrolled = _d[0], setIsScrolled = _d[1];
    react_1.useEffect(function () {
        var handleScroll = function () {
            if (window.pageYOffset > 0) {
                setIsScrolled(true);
            }
            else {
                setIsScrolled(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return function () {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    var hclass = "flex w-full top-0 left-0 justify-between px-12 lg:px-32 py-6 z-20 bg-white text-sky-700 dark:bg-zinc-800 dark:text-white border-b-2";
    var headerClassName = hclass + " \" \" " + (isScrolled ? "fixed" : "");
    var content = document.getElementById('afc-main');
    if (content && content.style) {
        if (isScrolled) {
            content.style.marginTop = "28px";
        }
        else {
            content.style.marginTop = "4px";
        }
    }
    return (React.createElement("div", { id: "afcHeader", className: headerClassName },
        React.createElement("div", { className: "lg:min-w-fit lg:flex items-center justify-between py-4 lg:px-10 px-7" },
            React.createElement("div", { onClick: function () { return setOpen(!open); }, className: "text-4xl absolute left-4 top-10 lg:hidden" },
                React.createElement(cg_1.CgMenuLeft, { name: open ? "close" : "menu" })),
            React.createElement("div", { className: "font-medium text-3xl cursor-pointer flex items-center" },
                React.createElement(link_1["default"], { href: "/" },
                    React.createElement(image_1["default"], { priority: true, alt: "Allfreechips Casino Guide", width: 250, height: 57, src: "https://afc-redux.vercel.app/logo.png" })))),
        React.createElement("ul", { className: "lg:grow lg:flex lg:items-center lg:pb-0 pb-12 bg-white dark:bg-zinc-800 absolute lg:static lg:z-auto z-[-1] left-0 w-full lg:w-auto lg:pl-0 pl-9 transition-all duration-100 lg:transition-none ease-in " + (open ? "top-20" : "top-[-490px]") },
            React.createElement("li", { className: "lg:ml-8 text-xl lg:my-0 my-7" },
                React.createElement(link_1["default"], { href: "/review", className: "font-medium hover:text-gray-400 duration-500" }, "Casino Reviews")),
            React.createElement("li", { className: "lg:ml-8 text-xl lg:my-0 my-7" },
                React.createElement(link_1["default"], { href: "/casino-bonuses", className: "font-medium hover:text-gray-400 duration-500" }, "Casino Bonuses")),
            React.createElement("li", { className: "lg:ml-8 text-xl lg:my-0 my-7" },
                React.createElement(link_1["default"], { href: "/software", className: "font-medium hover:text-gray-400 duration-500" }, "Casino Softwares")),
            React.createElement("li", { className: "lg:ml-8 text-xl lg:my-0 my-7" },
                React.createElement(link_1["default"], { href: "/guides", className: "font-medium hover:text-gray-400 duration-500" }, "Guides")),
            React.createElement("li", { className: "lg:ml-8 text-xl lg:my-0 my-7" })),
        React.createElement("div", { className: "basis-1/4 flex items-center justify-end space-x-4 ml-2" },
            React.createElement("div", { className: (isMounted && status !== "loading" ? "opacity-100" : "opacity-0") + " transition-opacity duration-500" }, isMounted && session ? (React.createElement("div", null,
                React.createElement("span", null, (_a = session.user) === null || _a === void 0 ? void 0 : _a.name),
                React.createElement("span", { className: "mx-8 font-medium hover:text-gray-400 hover:cursor-pointer", onClick: function () { return react_2.signOut(); } }, "Sign Out"))) : (React.createElement("span", { className: "font-medium hover:text-gray-400 hover:cursor-pointer", onClick: function () { return react_2.signIn(); } }, "Sign In"))))));
};
exports["default"] = HeaderClient;
