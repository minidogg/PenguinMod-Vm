/*
compiled blocks:
    sensing_set_of: jsgen.js@1195, irgen.js@1420
*/
const Cast = require('../util/cast');

class pmLiveTests {
    constructor (runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;
    }

    /**
     * Retrieve the block primitives implemented by this package.
     * @return {object.<string, Function>} Mapping of opcode to Function.
     */
    getPrimitives () {
        return {
            looks_setVertTransform: this.setVerticalTransform,
            looks_setHorizTransform: this.setHorizontalTransform
        };
    }

    setVerticalTransform (args, {target}) {
        const percent = Cast.toNumber(args.PERCENT) / 100;
        target.setTransform([percent, target.transform[1]]);
        if (target.visible) {
            vm.runtime.renderer.dirty = true;
            target.emitVisualChange();
            target.runtime.requestRedraw();
            target.runtime.requestTargetsUpdate(target);
        }
    }

    setHorizontalTransform (args, {target}) {
        const percent = Cast.toNumber(args.PERCENT) / 100;
        target.setTransform([target.transform[0], percent]);
        if (target.visible) {
            vm.runtime.renderer.dirty = true;
            target.emitVisualChange();
            target.runtime.requestRedraw();
            target.runtime.requestTargetsUpdate(target);
        }
    }
}

module.exports = pmLiveTests;
