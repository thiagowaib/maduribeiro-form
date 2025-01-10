const bntScroll = <HTMLButtonElement> document.getElementById('btn-scroll');
const scrollTarget = <HTMLElement> document.getElementById('scroll-target');

bntScroll.addEventListener('click', () => {
    scrollTarget.scrollIntoView(true);
});