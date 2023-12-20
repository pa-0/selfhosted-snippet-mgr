import { FC } from 'react'
import AceEditor, { IAceOptions } from 'react-ace'

import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/ext-language_tools'

interface CodeEditorProps extends IAceOptions {}

const TextArea: FC<CodeEditorProps> = ({ className, ...props }) => {
  return (
    <AceEditor
      placeholder='Snippet code goes here...'
      mode='javascript'
      theme='monokai'
      name='code-editor'
      width='100%'
      height='100%'
      className={className}
      fontSize={16}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={false}
      focus={true}
      setOptions={{
        enableBasicAutocompletion: false,
        enableLiveAutocompletion: false,
        enableSnippets: false,
        showLineNumbers: true,
        tabSize: 2,
        displayIndentGuides: false,
        showFoldWidgets: false,
        useWorker: false,
      }}
      {...props}
    />
  )
}

export default TextArea
