"use client";
import React, { useRef } from "react";

//// @ts-expect-error
import { lazy, useState, useEffect } from 'react';
import { EmojiPickerIcon, SendMessageIcon } from "../_lib/ChatData";

const factoryEmojiPicker = () => import("./EmojiPicker");
const EmojiPicker = lazy(factoryEmojiPicker);

interface props {
  loading: boolean,
  sendMessage: (event: any) => void
}

const ShoutBox : React.FC<props> = ( {loading,  sendMessage}) => {

    const textAreaRef: any = useRef(null);
    const [formData, setFormData] = useState({
      message: ''
    });
    const [showEmojis, setShowEmojis] = useState(false);
    
    useEffect(() => {
      factoryEmojiPicker();
    },[showEmojis]);

    const setTextAreaPost = (postion) => {
      if(textAreaRef.current){
        textAreaRef.current.selectionStart = postion;
        textAreaRef.current.selectionEnd = postion;
        textAreaRef.current.focus();
      }
    }
    // add Emoji from emoji mart
    const addEmoji = (emoji: any) => {
      let myField: any = document.getElementById('message');
      let myValue = emoji['native'];

      // count emoji in textarea 
      let findEmojis = (text) => {
        const emojiRegex = /[\u{1F300}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F1E0}-\u{1F1FF}]/ug;
        const emojis = text.match(emojiRegex) || [];
        return emojis;
      };
      
      const emojiCount = findEmojis(myField['value']).length;
      
      // if emoji count < 5 , you can add emoji
      if(emojiCount < 5){ 
        //IE support
        if (document['selection']) {
          myField.focus();
          let sel = document['selection'].createRange();
          sel.text = myValue;
        }
        //MOZILLA and others
        else if (myField['selectionStart'] || myField['selectionStart'] == '0') {
            var startPos = myField['selectionStart'];
            var endPos = myField['selectionEnd'];
            myField['value'] = myField['value'].substring(0, startPos)
                + myValue
                + myField['value'].substring(endPos, myField['value'].length);
            // Set cursor position after updating textarea value
            setTextAreaPost(startPos + myValue.length)
          } else {
            myField['value'] += myValue;
        }
      }
      setFormData({
        message: myField['value']
      })
      return emojiCount;
    }
 
    const handleFormSubmit = (e) => {
      e.preventDefault();
      
      if (formData.message && formData.message != "") { 
        sendMessage(formData);
      }

      setFormData({
        message: ''
      });

    }
    
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value
      }));
    };


    return (
      <>
        {!loading ? <div>
            <form 
            className="mb-6" 
            //// @ts-expect-error
            action={sendMessage}>
                <div className="bg-grey-lighter md:px-4 md:py-4 sm:px:2 sm:py-2 flex ">
                  <div className="flex-1 md:mx-4 sm:mx-2">
                    <textarea id="message" name="message" rows={3}
                      onChange={handleInputChange}
                      value={formData.message}
                      ref={textAreaRef}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..." required />

                  </div>
                  <div className="md:ml-2 mt-3">
                    <button className="flex items-center justify-center text-white sm:px-1 md:px-4 py-1 flex-shrink-0" onClick={(e)=>{
                      e.preventDefault()
                      setShowEmojis(true);}}>
                        <EmojiPickerIcon />
                    </button>
                  </div>
                  <div className="md:ml-4 sm:ml-2 mt-3">
                    <button onClick={handleFormSubmit} className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0">
                      <span>Send</span>
                      <span className="ml-2">
                        <SendMessageIcon />
                      </span>
                    </button>
                  </div>
              </div>
            </form>
            
          {/* <OnIntervalFn intervalMs={5000} fn={refresh} /> */}
          </div> : 
          <></>
        }
        {loading && 
        <div role="status" className="space-y-2.5 animate-pulse max-w-lg md:px-8 md:py-2 sm:px:4 sm:py-4 flex">
        
          <div className="flex items-center w-full space-x-2">
              <div className="h-16 bg-gray-200 rounded-xl dark:bg-gray-700 w-4/5 mb-4"></div>
              <div className="relative h-32 w-32 ...">
                <div className="absolute top-0 right-0 h-12 w-8 ...">
                  <div className="h-8 bg-gray-200 rounded-full dark:bg-gray-700 w-24 absolute bottom-0 left-0"></div>
                </div>
              </div>
          </div>
      </div>
        }
        <EmojiPicker show={showEmojis} addEmoji={addEmoji} setShowEmojis={setShowEmojis} />
      </>
      
    );
  }

  export default ShoutBox;