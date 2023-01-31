/**
 * @enum number
 */
const State = {
  None: 0,
  TopLevelContent: 1,
  AfterOpeningAngleBracket: 2,
  InsideOpeningTag: 3,
  InsideOpeningTagAndHasSeenWhitespace: 4,
  AfterClosingTagAngleBrackets: 5,
  AfterClosingTagName: 6,
  AfterAttributeName: 7,
  AfterAttributeEqualSign: 8,
  InsideAttributeDoubleQuote: 9,
  InsideBlockComment: 10,
  InsideString: 11,
  AfterKeyword: 12,
  Keyword: 13,
  InsideLineComment: 14,
  InsideSingleQuoteString: 15,
  InsideDoubleQuoteString: 16,
  InsideBacktickString: 17,
  AfterPropertyDot: 18,
  InsideTag: 19,
}

/**
 * @enum number
 */
export const TokenType = {
  None: 99999999,
  Numeric: 30,
  String: 50,
  Whitespace: 777,
  Comment: 60,
  Text: 117,
  PunctuationTag: 228,
  TagName: 118,
  AttributeName: 119,
  Punctuation: 10,
  Error: 141,
  PunctuationString: 11,
  NewLine: 771,
  Keyword: 951,
  VariableName: 952,
  LanguageConstant: 13,
  Regex: 14,
  KeywordImport: 215,
  KeywordControl: 881,
  KeywordModifier: 882,
  KeywordReturn: 883,
  KeywordNew: 884,
  FunctionName: 885,
  KeywordThis: 886,
  KeywordOperator: 887,
  KeywordFunction: 889,
}

export const TokenMap = {
  [TokenType.None]: 'None',
  [TokenType.Numeric]: 'Numeric',
  [TokenType.String]: 'String',
  [TokenType.Whitespace]: 'Whitespace',
  [TokenType.Comment]: 'Comment',
  [TokenType.Text]: 'Text',
  [TokenType.PunctuationTag]: 'PunctuationTag',
  [TokenType.TagName]: 'TagName',
  [TokenType.AttributeName]: 'AttributeName',
  [TokenType.Punctuation]: 'Punctuation',
  [TokenType.Error]: 'Error',
  [TokenType.PunctuationString]: 'PunctuationString',
  [TokenType.NewLine]: 'NewLine',
  [TokenType.Keyword]: 'Keyword',
  [TokenType.VariableName]: 'VariableName',
  [TokenType.LanguageConstant]: 'LanguageConstant',
  [TokenType.Regex]: 'Regex',
  [TokenType.KeywordImport]: 'KeywordImport',
  [TokenType.KeywordControl]: 'KeywordControl',
  [TokenType.KeywordModifier]: 'KeywordModifier',
  [TokenType.KeywordReturn]: 'KeywordReturn',
  [TokenType.KeywordNew]: 'KeywordNew',
  [TokenType.FunctionName]: 'Function',
  [TokenType.KeywordThis]: 'KeywordThis',
  [TokenType.KeywordOperator]: 'KeywordOperator',
  [TokenType.KeywordFunction]: 'KeywordFunction',
}

const RE_KEYWORD =
  /^(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|finally|for|from|function|if|implements|import|in|Infinity|instanceof|interface|let|new|null|of|package|private|protected|public|return|super|switch|static|this|throw|try|true|typeof|undefined|var|void|while|with|yield)\b/
const RE_CURLY_OPEN = /^\{/
const RE_CURLY_CLOSE = /^\}/
const RE_SQUARE_OPEN = /^\[/
const RE_SQUARE_CLOSE = /^\]/
const RE_COMMA = /^,/
const RE_COLON = /^:/
const RE_NUMERIC =
  /^((0(x|X)[0-9a-fA-F]*)|(([0-9]+\.?[0-9]*)|(\.[0-9]+))((e|E)(\+|-)?[0-9]+)?)\b/
const RE_NUMERIC_OCTAL = /0(?:o|O)?[0-7][0-7_]*(n)?\b/
const RE_LINE_COMMENT_START = /^\/\//
const RE_LINE_COMMENT_CONTENT = /^[^\n]+/
const RE_NEWLINE_WHITESPACE = /^\n\s*/
const RE_BLOCK_COMMENT_START = /^\/\*/
const RE_BLOCK_COMMENT_CONTENT = /^.+?(?=\*\/)/
const RE_BLOCK_COMMENT_END = /^\*\//
const RE_UNKNOWN_VALUE = /^[^\}\{\s,"]+/
const RE_IMPORT = /^[a-zA-Z\.]+/
const RE_SEMICOLON = /^;/
const RE_VARIABLE_NAME = /^[a-zA-Z_$][a-zA-Z\d\_]*/
const RE_LINE_COMMENT = /^\/\/[^\n]*/
const RE_ROUND_OPEN = /^\(/
const RE_ROUND_CLOSE = /^\)/
const RE_DOT = /^\./
const RE_EQUAL_SIGN = /^=/
const RE_SINGLE_QUOTE = /^'/
const RE_PUNCTUATION = /^[\(\)=\+\-><\.:;\{\}\[\]!,&\|\^\?\*%~]/
const RE_SLASH = /^\//
const RE_ANYTHING_UNTIL_END = /^.+/s
const RE_WHITESPACE = /^\s+/
const RE_QUOTE_SINGLE = /^'/
const RE_QUOTE_DOUBLE = /^"/
const RE_QUOTE_BACKTICK = /^`/
const RE_STRING_SINGLE_QUOTE_CONTENT = /^[^'\\]+/
const RE_STRING_DOUBLE_QUOTE_CONTENT = /^[^"\\]+/
const RE_STRING_BACKTICK_QUOTE_CONTENT = /^[^`\\\$]+/
const RE_STRING_ESCAPE = /^\\./
const RE_SHEBANG = /^#!.*/
const RE_FUNCTION_CALL_NAME = /^[\w]+(?=\s*(\(|\=\s*function|\=\s*\())/
const RE_DECORATOR = /^@\w+/
const RE_BACKSLASH = /^\\/
const RE_DOLLAR_CURLY_OPEN = /^\$\{/
const RE_DOLLAR = /^\$/
const RE_ANYTHING = /^.+/u
const RE_ANGLE_BRACKET_OPEN_TAG = /^<(?![\s!<=])/
const RE_ANGLE_BRACKET_CLOSE_TAG = /^<\/(?![\s!])/
const RE_TAGNAME = /^[!\w\:\.]+/
const RE_ANGLE_BRACKET_CLOSE = /^>/
const RE_ANGLE_BRACKET_ONLY = /^</
const RE_ANGLE_BRACKET_OPEN = /^</
const RE_ANY_TEXT = /^[^\n]+/
const RE_PUNCTUATION_SELF_CLOSING = /^\/>/
const RE_TAG_TEXT = /^[^\s>]+/
const RE_ATTRIBUTE_NAME = /^[a-zA-Z\d\-\:]+/
const RE_DOUBLE_QUOTE = /^"/
const RE_ATTRIBUTE_VALUE_UNQUOTED = /^[^<>\s]+/

// copied from https://github.com/PrismJS/prism/blob/master/components/prism-jsx.js#L57
const RE_REGEX =
  /^((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/

const RE_VARIABLE_NAME_SPECIAL = /\p{L}/u
const RE_VARIABLE_NAME_SPECIAL_2 = /./u
const RE_SELF_CLOSING = /^\/>/
const RE_TEXT = /^[^<>\n\{\}\)]+/

export const initialLineState = {
  state: State.TopLevelContent,
  /**
   * @type {any[]}
   */
  stack: [],
  tag: '',
}

export const hasArrayReturn = true

/**
 *
 * @param {string} line
 * @param {*} lineState
 * @returns
 */
export const tokenizeLine = (line, lineState) => {
  let next = null
  let index = 0
  let tokens = []
  let token = TokenType.None
  let state = lineState.state
  let stack = [...lineState.stack]
  let tag = lineState.tag

  while (index < line.length) {
    const part = line.slice(index)
    switch (state) {
      case State.TopLevelContent:
        if ((next = part.match(RE_WHITESPACE))) {
          token = TokenType.Whitespace
          state = State.TopLevelContent
        } else if ((next = part.match(RE_KEYWORD))) {
          switch (next[0]) {
            case 'true':
            case 'false':
            case 'null':
            case 'undefined':
              token = TokenType.LanguageConstant
              break
            case 'import':
            case 'export':
            case 'from':
              token = TokenType.KeywordImport
              break
            case 'as':
            case 'switch':
            case 'default':
            case 'case':
            case 'else':
            case 'if':
            case 'break':
            case 'throw':
            case 'for':
            case 'try':
            case 'catch':
            case 'finally':
            case 'continue':
            case 'while':
              token = TokenType.KeywordControl
              break
            case 'async':
            case 'await':
              token = TokenType.KeywordModifier
              break
            case 'return':
              token = TokenType.KeywordReturn
              break
            case 'new':
              token = TokenType.KeywordNew
              break
            case 'this':
              token = TokenType.KeywordThis
              break
            case 'delete':
            case 'typeof':
            case 'in':
              token = TokenType.KeywordOperator
              break
            case 'function':
              token = TokenType.KeywordFunction
              break
            case 'Infinity':
              token = TokenType.Numeric
              state = State.TopLevelContent
              break
            case 'of':
              token = TokenType.KeywordOperator
              break
            default:
              token = TokenType.Keyword
              break
          }
          state = State.TopLevelContent
        } else if ((next = part.match(RE_FUNCTION_CALL_NAME))) {
          token = TokenType.FunctionName
          state = State.TopLevelContent
        } else if ((next = part.match(RE_VARIABLE_NAME))) {
          token = TokenType.VariableName
          state = State.TopLevelContent
        } else if ((next = part.match(RE_NUMERIC))) {
          token = TokenType.Numeric
          state = State.TopLevelContent
        } else if ((next = part.match(RE_ANGLE_BRACKET_OPEN_TAG))) {
          token = TokenType.PunctuationTag
          state = State.AfterOpeningAngleBracket
        } else if ((next = part.match(RE_CURLY_CLOSE))) {
          token = TokenType.Punctuation
          state = stack.pop() || State.TopLevelContent
        } else if ((next = part.match(RE_PUNCTUATION))) {
          token = TokenType.Punctuation
          if (next[0] === '.') {
            state = State.AfterPropertyDot
          } else if (next[0] === '}') {
            state = stack.pop() || State.TopLevelContent
          } else {
            state = State.TopLevelContent
          }
        } else if ((next = part.match(RE_SLASH))) {
          if ((next = part.match(RE_BLOCK_COMMENT_START))) {
            token = TokenType.Comment
            state = State.InsideBlockComment
          } else if ((next = part.match(RE_LINE_COMMENT_START))) {
            token = TokenType.Comment
            state = State.InsideLineComment
          } else if ((next = part.match(RE_REGEX))) {
            token = TokenType.Regex
            state = State.TopLevelContent
          } else {
            next = part.match(RE_SLASH)
            token = TokenType.Punctuation
            state = State.TopLevelContent
          }
        } else if ((next = part.match(RE_QUOTE_SINGLE))) {
          token = TokenType.Punctuation
          state = State.InsideSingleQuoteString
        } else if ((next = part.match(RE_QUOTE_DOUBLE))) {
          token = TokenType.Punctuation
          stack.push(state)
          state = State.InsideDoubleQuoteString
        } else if ((next = part.match(RE_QUOTE_BACKTICK))) {
          token = TokenType.Punctuation
          state = State.InsideBacktickString
        } else if ((next = part.match(RE_NUMERIC_OCTAL))) {
          token = TokenType.Numeric
          state = State.TopLevelContent
        } else if ((next = part.match(RE_SHEBANG))) {
          token = TokenType.Comment
          state = State.TopLevelContent
        } else if ((next = part.match(RE_DECORATOR))) {
          token = TokenType.VariableName
          state = State.TopLevelContent
        } else if ((next = part.match(RE_VARIABLE_NAME_SPECIAL))) {
          token = TokenType.VariableName
          state = State.TopLevelContent
        } else if ((next = part.match(RE_ANYTHING))) {
          token = TokenType.Text
          state = State.TopLevelContent
        } else {
          throw new Error('no')
        }
        break
      case State.Keyword:
        const keyword = next[0]
        switch (keyword) {
          case 'true':
          case 'false':
            break
          default:
            token = TokenType.Keyword
            state = State.TopLevelContent
            break
        }
        break
      case State.InsideLineComment:
        if ((next = part.match(RE_ANYTHING_UNTIL_END))) {
          token = TokenType.Comment
          state = State.TopLevelContent
        } else {
          throw new Error('no')
        }
        break
      case State.InsideBlockComment:
        if ((next = part.match(RE_BLOCK_COMMENT_END))) {
          token = TokenType.Comment
          state = State.TopLevelContent
        } else if ((next = part.match(RE_BLOCK_COMMENT_CONTENT))) {
          token = TokenType.Comment
          state = State.InsideBlockComment
        } else if ((next = part.match(RE_ANYTHING_UNTIL_END))) {
          token = TokenType.Comment
          state = State.InsideBlockComment
        } else {
          throw new Error('no')
        }
        break
      case State.InsideSingleQuoteString:
        if ((next = part.match(RE_QUOTE_SINGLE))) {
          token = TokenType.Punctuation
          state = State.TopLevelContent
        } else if ((next = part.match(RE_STRING_SINGLE_QUOTE_CONTENT))) {
          token = TokenType.String
          state = State.InsideSingleQuoteString
        } else if ((next = part.match(RE_STRING_ESCAPE))) {
          token = TokenType.String
          state = State.InsideSingleQuoteString
        } else if ((next = part.match(RE_BACKSLASH))) {
          token = TokenType.String
          state = State.InsideSingleQuoteString
        } else {
          part
          throw new Error('no')
        }
        break
      case State.InsideDoubleQuoteString:
        if ((next = part.match(RE_QUOTE_DOUBLE))) {
          token = TokenType.Punctuation
          state = stack.pop() || State.TopLevelContent
        } else if ((next = part.match(RE_STRING_DOUBLE_QUOTE_CONTENT))) {
          token = TokenType.String
          state = State.InsideDoubleQuoteString
        } else if ((next = part.match(RE_STRING_ESCAPE))) {
          token = TokenType.String
          state = State.InsideDoubleQuoteString
        } else if ((next = part.match(RE_BACKSLASH))) {
          token = TokenType.String
          state = State.InsideDoubleQuoteString
        } else {
          throw new Error('no')
        }
        break
      case State.InsideBacktickString:
        if ((next = part.match(RE_QUOTE_BACKTICK))) {
          token = TokenType.Punctuation
          state = State.TopLevelContent
        } else if ((next = part.match(RE_STRING_BACKTICK_QUOTE_CONTENT))) {
          token = TokenType.String
          state = State.InsideBacktickString
        } else if ((next = part.match(RE_DOLLAR_CURLY_OPEN))) {
          token = TokenType.Punctuation
          state = State.TopLevelContent
          stack.push(State.InsideBacktickString)
        } else if ((next = part.match(RE_STRING_ESCAPE))) {
          token = TokenType.String
          state = State.InsideBacktickString
        } else if ((next = part.match(RE_BACKSLASH))) {
          token = TokenType.String
          state = State.InsideDoubleQuoteString
        } else if ((next = part.match(RE_DOLLAR))) {
          token = TokenType.String
          state = State.InsideBacktickString
        } else {
          throw new Error('no')
        }
        break
      case State.AfterPropertyDot:
        if ((next = part.match(RE_WHITESPACE))) {
          token = TokenType.Whitespace
          state = State.AfterPropertyDot
        } else if ((next = part.match(RE_FUNCTION_CALL_NAME))) {
          token = TokenType.FunctionName
          state = State.TopLevelContent
        } else if ((next = part.match(RE_VARIABLE_NAME))) {
          token = TokenType.VariableName
          state = State.TopLevelContent
        } else if ((next = part.match(RE_LINE_COMMENT))) {
          token = TokenType.Comment
          state = State.InsideLineComment
        } else if ((next = part.match(RE_BLOCK_COMMENT_START))) {
          token = TokenType.Comment
          state = State.InsideBlockComment
        } else if ((next = part.match(RE_PUNCTUATION))) {
          token = TokenType.Punctuation
          state = State.TopLevelContent
        } else if ((next = part.match(RE_VARIABLE_NAME_SPECIAL_2))) {
          token = TokenType.VariableName
          state = State.TopLevelContent
        } else {
          throw new Error('no')
        }
        break
      case State.AfterOpeningAngleBracket:
        if ((next = part.match(RE_TAGNAME))) {
          token = TokenType.TagName
          state = State.InsideOpeningTag
          tag = next[0]
        } else if ((next = part.match(RE_SLASH))) {
          token = TokenType.PunctuationTag
          state = State.AfterClosingTagAngleBrackets
        } else if ((next = part.match(RE_ANGLE_BRACKET_CLOSE))) {
          token = TokenType.PunctuationTag
          state = State.TopLevelContent
        } else if ((next = part.match(RE_ANGLE_BRACKET_OPEN))) {
          token = TokenType.PunctuationTag
          state = State.AfterOpeningAngleBracket
        } else if ((next = part.match(RE_ANY_TEXT))) {
          token = TokenType.Text
          state = State.TopLevelContent
        } else {
          part //?
          throw new Error('no')
        }
        break
      case State.InsideOpeningTag:
        if ((next = part.match(RE_ANGLE_BRACKET_CLOSE))) {
          token = TokenType.PunctuationTag
          state = State.InsideTag
        } else if ((next = part.match(RE_WHITESPACE))) {
          token = TokenType.Whitespace
          state = State.InsideOpeningTagAndHasSeenWhitespace
        } else if ((next = part.match(RE_PUNCTUATION_SELF_CLOSING))) {
          token = TokenType.PunctuationTag
          state = State.TopLevelContent
        } else if ((next = part.match(RE_TAG_TEXT))) {
          token = TokenType.Text
          state = State.InsideOpeningTag
        } else {
          part //?
          throw new Error('no')
        }
        break
      case State.InsideOpeningTagAndHasSeenWhitespace:
        if ((next = part.match(RE_ATTRIBUTE_NAME))) {
          token = TokenType.AttributeName
          state = State.AfterAttributeName
        } else if ((next = part.match(RE_SELF_CLOSING))) {
          token = TokenType.PunctuationTag
          state = State.TopLevelContent
        } else if ((next = part.match(RE_ANGLE_BRACKET_CLOSE))) {
          token = TokenType.PunctuationTag
          state = State.InsideTag
        } else if ((next = part.match(RE_CURLY_OPEN))) {
          token = TokenType.Punctuation
          state = State.TopLevelContent
          stack.push(State.InsideOpeningTag)
        } else if ((next = part.match(RE_TAG_TEXT))) {
          token = TokenType.Text
          state = State.TopLevelContent
        } else {
          part //?
          throw new Error('no')
        }
        break
      case State.AfterClosingTagAngleBrackets:
        if ((next = part.match(RE_TAGNAME))) {
          token = TokenType.TagName
          state = State.AfterClosingTagName
        } else if ((next = part.match(RE_WHITESPACE))) {
          token = TokenType.Whitespace
          state = State.TopLevelContent
        } else if ((next = part.match(RE_ANGLE_BRACKET_CLOSE))) {
          token = TokenType.PunctuationTag
          state = State.InsideTag
        } else if ((next = part.match(RE_ANY_TEXT))) {
          token = TokenType.Text
          state = State.TopLevelContent
        } else {
          part //?
          throw new Error('no')
        }
        break
      case State.AfterClosingTagName:
        if ((next = part.match(RE_ANGLE_BRACKET_CLOSE))) {
          token = TokenType.PunctuationTag
          state = State.InsideTag
        } else if ((next = part.match(RE_TEXT))) {
          token = TokenType.Text
          state = State.TopLevelContent
        } else {
          throw new Error('no')
        }
        break
      case State.InsideTag:
        if ((next = part.match(RE_TEXT))) {
          token = TokenType.Text
          state = State.InsideTag
        } else if ((next = part.match(RE_ANGLE_BRACKET_OPEN_TAG))) {
          token = TokenType.PunctuationTag
          state = State.AfterOpeningAngleBracket
        } else if ((next = part.match(RE_ANGLE_BRACKET_CLOSE_TAG))) {
          token = TokenType.PunctuationTag
          state = State.AfterClosingTagAngleBrackets
        } else if ((next = part.match(RE_CURLY_OPEN))) {
          token = TokenType.Punctuation
          state = State.TopLevelContent
          stack.push(State.InsideTag)
        } else if ((next = part.match(RE_CURLY_CLOSE))) {
          token = TokenType.Punctuation
          state = stack.pop() || State.TopLevelContent
        } else if ((next = part.match(RE_ROUND_CLOSE))) {
          token = TokenType.Punctuation
          state = stack.pop() || State.TopLevelContent
        } else {
          part
          throw new Error('no')
        }
        break
      case State.AfterAttributeName:
        if ((next = part.match(RE_ANGLE_BRACKET_CLOSE))) {
          token = TokenType.PunctuationTag
          state = State.InsideTag
        } else if ((next = part.match(RE_EQUAL_SIGN))) {
          token = TokenType.Punctuation
          state = State.AfterAttributeEqualSign
        } else if ((next = part.match(RE_DOUBLE_QUOTE))) {
          token = TokenType.PunctuationString
          state = State.InsideDoubleQuoteString
        } else if ((next = part.match(RE_SINGLE_QUOTE))) {
          token = TokenType.PunctuationString
          state = State.InsideSingleQuoteString
        } else if ((next = part.match(RE_TAG_TEXT))) {
          token = TokenType.Text
          state = State.InsideOpeningTag
        } else if ((next = part.match(RE_WHITESPACE))) {
          token = TokenType.Whitespace
          state = State.InsideOpeningTagAndHasSeenWhitespace
        } else {
          // TODO check quotation mark
          part //?
          throw new Error('no')
        }
        break
      case State.AfterAttributeEqualSign:
        if ((next = part.match(RE_DOUBLE_QUOTE))) {
          token = TokenType.PunctuationString
          state = State.InsideDoubleQuoteString
          stack.push(State.InsideOpeningTag)
        } else if ((next = part.match(RE_SINGLE_QUOTE))) {
          token = TokenType.PunctuationString
          state = State.InsideSingleQuoteString
          stack.push(State.InsideOpeningTag)
        } else if ((next = part.match(RE_CURLY_OPEN))) {
          token = TokenType.Punctuation
          state = State.TopLevelContent
          stack.push(State.InsideOpeningTag)
        } else if ((next = part.match(RE_ANGLE_BRACKET_CLOSE))) {
          token = TokenType.PunctuationTag
          state = State.TopLevelContent
        } else if ((next = part.match(RE_ATTRIBUTE_VALUE_UNQUOTED))) {
          token = TokenType.String
          state = State.InsideOpeningTag
        } else {
          part
          throw new Error('no')
        }
        break
      default:
        state
        throw new Error('no')
    }
    const tokenLength = next[0].length
    index += tokenLength
    tokens.push(token, tokenLength)
  }
  if (state === State.InsideLineComment) {
    state = State.TopLevelContent
  }
  if (state === State.InsideSingleQuoteString && !line.endsWith('\\')) {
    state = State.TopLevelContent
  }
  if (state === State.InsideTag && line.endsWith(',')) {
    state = stack.pop() || State.TopLevelContent
  }
  return {
    state,
    tokens,
    stack,
    tag,
  }
}
