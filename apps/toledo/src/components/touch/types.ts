interface TouchBaseEvent {
  touchstartX: number;
  touchstartY: number;
  touchendX: number;
  touchendY: number;
  touchmoveX: number;
  touchmoveY: number;
  offsetX: number;
  offsetY: number;
  originalEvent: TouchEvent;
}

export interface TouchStartEvent extends TouchBaseEvent {
  start: (event: TouchStartEvent) => void;
}
export interface TouchEndEvent extends TouchBaseEvent {
  end: (event: TouchEndEvent) => void;
}
export interface TouchMoveEvent extends TouchBaseEvent {
  move: (event: TouchMoveEvent) => void;
}
export interface TouchLeftEvent extends TouchBaseEvent {
  left: (event: TouchLeftEvent) => void;
}
export interface TouchRightEvent extends TouchBaseEvent {
  right: (event: TouchRightEvent) => void;
}
export interface TouchUpEvent extends TouchBaseEvent {
  up: (event: TouchUpEvent) => void;
}
export interface TouchDownEvent extends TouchBaseEvent {
  down: (event: TouchDownEvent) => void;
}

export interface TouchControls {
  start?: (event: TouchStartEvent) => void;
  end?: (event: TouchEndEvent) => void;
  move?: (event: TouchMoveEvent) => void;
  left?: (event: TouchLeftEvent) => void;
  right?: (event: TouchRightEvent) => void;
  up?: (event: TouchUpEvent) => void;
  down?: (event: TouchDownEvent) => void;
}
