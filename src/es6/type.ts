type Action = {
    type: string;
    payload: unknown;
}
function reducer(status: {}, action: Action) {
    action.payload

    let hw: HW = HW.aa;
    let ss: "11" | "22"

    switch (hw) {
        case "cc":

            break;
    }

    switch (ss) {
        case "11":

            break;
    }

}

enum HW {
    aa = "cc",
    bb = "bb"
}

type ob = {
    type: typeof HW.aa;
}

interface Square {
    kind: "square";
    size: number;
}

interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}

interface Circle {
    kind: "circle";
    radius: number;
}


type Shape = Square | Rectangle | Circle;

function area(s: Shape) {

    let o: ob = { type: HW.aa }

    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.width * s.height;
        case "circle": return Math.PI * s.radius ** 2;
    }
}




