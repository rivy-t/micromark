import labelEnd from './label-end.mjs'

var labelStartImage = {
  tokenize: tokenizeLabelStartImage,
  resolveAll: labelEnd.resolveAll
}
export default labelStartImage

import assert from 'assert'
import codes from '../character/codes.mjs'
import types from '../constant/types.mjs'

function tokenizeLabelStartImage(effects, ok, nok) {
  var self = this

  return start

  function start(code) {
    assert(code === codes.exclamationMark, 'expected `!`')
    effects.enter(types.labelImage)
    effects.enter(types.labelImageMarker)
    effects.consume(code)
    effects.exit(types.labelImageMarker)
    return open
  }

  function open(code) {
    if (code === codes.leftSquareBracket) {
      effects.enter(types.labelMarker)
      effects.consume(code)
      effects.exit(types.labelMarker)
      effects.exit(types.labelImage)
      return after
    }

    return nok(code)
  }

  function after(code) {
    /* istanbul ignore next - footnotes. */
    return code === codes.caret &&
      '_hiddenFootnoteSupport' in self.parser.constructs
      ? nok(code)
      : ok(code)
  }
}
