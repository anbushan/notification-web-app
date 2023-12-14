import EmojiPicker, { EmojiStyle } from 'emoji-picker-react'
import { useState } from 'react'
import * as React from 'react'
import TextInput from './TextInput'

export default function EmojiPickers() {
  const [inputValue, setInputValue] = useState('')

  function onClick(emojiData, event) {
    setInputValue(
      (inputValue) =>
        inputValue + (emojiData.isCustom ? emojiData.unified : emojiData.emoji),
    )
  }

  return (
    <div>
      <div>
       
         <TextInput
         star={"none"}
                   className="text-input"
                   type="text"
                   value={inputValue}
                   onChange={(e) => setInputValue(e.target.value)}
                   placeholder="Select Emojis..."
                   label="Emoji"
                  />

      </div>
      <EmojiPicker
        onEmojiClick={onClick}
        autoFocusSearch={false}
        emojiStyle={EmojiStyle.NATIVE}
      />
    </div>
  )
}
