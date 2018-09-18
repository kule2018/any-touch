import session from '../session';
let prevPointers: any[] = undefined;
let isPressed = false;
export default function (event: any): any {
    const { clientX, clientY, type } = event;
    const changedPointers = prevPointers;
    const Map: any = {
        mousedown: 'start',
        mousemove: 'move',
        mouseup: 'end'
    };
    session.inputStatus = Map[type];

    let pointers = prevPointers = [{ clientX, clientY }];
    let length = 1;
    if ('mousedown' === type) {
        isPressed = true;
    } else if ('mousemove' === type) {
        if (!isPressed) return;
    } else if ('mouseup' === type) {
        if (isPressed) {
            pointers = [];
            length = 0;
        } else {
            return;
        };
        isPressed = false;
    }

    return {
        changedPointers,
        pointers,
        length
    }
}; 