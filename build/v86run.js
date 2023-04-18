$(document).ready(function(){
var emulator = new V86Starter({
    screen_container: document.getElementById("winModal"),
    bios: {
        url: "./seabios.bin",
    },
    vga_bios: {
        url: "./vgabios.bin",
    },
    fda: {
        url: "./msdos7-1a.img",
    },
    autostart: true,
});
});
