const menuWidth = 300;

var slideout = new Slideout({
    'panel': document.getElementById('panel'),
    'menu': document.getElementById('menu'),
    'padding': menuWidth,
    'tolerance': 70
});

// Toggle Button
document.getElementById('sandwhich-icon').addEventListener('click', function () {
    slideout.open();
});
document.getElementById('canvas-wrapper').addEventListener('click', function () {
    slideout.close();
});

var fixed = document.getElementById('fixed-header');

slideout.on('translate', function(translated) {
    fixed.style.transform = 'translateX(' + translated + 'px)';
});

slideout.on('beforeopen', function () {
    fixed.style.transition = 'transform 300ms ease';
    fixed.style.transform = 'translateX(-' + menuWidth + 'px)';
});

slideout.on('beforeclose', function () {
    fixed.style.transition = 'transform 300ms ease';
    fixed.style.transform = 'translateX(0px)';
});

slideout.on('open', function () {
    fixed.style.transition = '';
});

slideout.on('close', function () {
    fixed.style.transition = '';
});