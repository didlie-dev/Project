
    return (d)=>{

    const draggable = document.getElementById(d);

    let offsetX, offsetY, isDragging = false;

    const onMouseDown = (e) => {
        isDragging = true;
        offsetX = e.clientX - draggable.offsetLeft;
        offsetY = e.clientY - draggable.offsetTop;
        };

    const onTouchStart = (e) => {
        isDragging = true;
        const touch = e.touches[0];
        offsetX = touch.clientX - draggable.offsetLeft;
        offsetY = touch.clientY - draggable.offsetTop;
        };

    const onMouseMove = (e) => {
        if (isDragging) {
            draggable.style.left = `${e.clientX - offsetX}px`;
            draggable.style.top = `${e.clientY - offsetY}px`;
        }
        };

    const onTouchMove = (e) => {
        if (isDragging) {
            const touch = e.touches[0];
            draggable.style.left = `${touch.clientX - offsetX}px`;
            draggable.style.top = `${touch.clientY - offsetY}px`;
        }
        };

    const onMouseUp = () => {
        isDragging = false;
        };

    const onTouchEnd = () => {
        isDragging = false;
        };

    draggable.addEventListener('mousedown', onMouseDown);
    draggable.addEventListener('touchstart', onTouchStart);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('touchend', onTouchEnd);

}