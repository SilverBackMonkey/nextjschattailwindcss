"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
function MobileJump(_a) {
    var links = _a.links, left = _a.left, close = _a.close;
    var _b = react_1.useState(true), show = _b[0], setShow = _b[1];
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "flex lg:hidden justify-between bg-sky-700 px-4 py-2 items-center text-white dark:bg-white dark:text-black" },
            React.createElement("span", { className: "font-medium" }, "ON THIS PAGE"),
            React.createElement("span", { onClick: function () { return setShow(!show); }, className: "border-2 border-white dark:border-black p-2 flex items-center rounded px-4" },
                "Jump to ",
                left)),
        React.createElement("div", { className: "flex lg:hidden flex-col w-full fixed p-4 rounded-t-2xl justify-between z-20 bg-white dark:bg-zinc-800  text-2xl font-medium " + (show ? "bottom-[-490px]" : "bottom-0") },
            React.createElement("div", { className: "flex justify-between w-full items-center" },
                React.createElement("div", null, "ON THIS PAGE"),
                React.createElement("div", { onClick: function () { return setShow(!show); }, className: "" }, close)),
            React.createElement("hr", { className: "border-1 my-4 border-sky-700 dark:border-white" }),
            React.createElement("div", { className: "flex flex-col font-normal text-lg space-x-2 space-y-4" },
                React.createElement("span", { className: "font-medium border-l-2 px-4 border-sky-700 dark:border-white" }, "Our top picks"),
                links.links.map(function (link, id) {
                    var data = { link: link, id: id };
                    return (React.createElement("span", { key: id },
                        React.createElement("a", { href: link.link }, link.text)));
                })))));
}
exports["default"] = MobileJump;
