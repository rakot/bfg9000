import "./index.css";
interface config {
    reloadTime?: number;
    minHeight?: number;
    minWidth?: number;
    checkType?: 'both' | 'any';
}
declare class Bfg9000 {
    #private;
    constructor({ reloadTime, minHeight, minWidth, checkType }: config);
}
export default Bfg9000;
