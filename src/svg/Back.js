
import React from 'react'

export default function Back() {
const back=`<svg width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 10L15 0V20L0 10Z" fill="white"/>
</svg>`

  return (
    <>
    <span dangerouslySetInnerHTML={{__html:back}}></span>
    </>
  )
}
