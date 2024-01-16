import Coordinates from "./Coordinates";

export default class Light {
  private _isLit: boolean;
  private _coordinates: Coordinates;

  constructor(coordinates: Coordinates) {
    this._isLit = false;
    this._coordinates = coordinates;
  }

  turnOn(): void {
    this._isLit = true;
  }

  turnOff(): void {
    this._isLit = false;
  }

  toggle(): void {
    this._isLit = !this._isLit;
  }

  get isLit(): boolean {
    return this._isLit;
  }

  get coordinates(): Coordinates {
    return this._coordinates;
  }
}
