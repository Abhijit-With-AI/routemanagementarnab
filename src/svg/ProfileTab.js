
import React from 'react'

export default function ProfileTab() {
    const profiletab=`<svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.6837 12.3912C21.6837 14.0345 21.0309 15.6105 19.8691 16.7724C18.7072 17.9344 17.1314 18.5872 15.4883 18.5872C13.8452 18.5872 12.2694 17.9344 11.1075 16.7724C9.94569 15.6105 9.29297 14.0345 9.29297 12.3912C9.29297 10.748 9.94569 9.17202 11.1075 8.01006C12.2694 6.8481 13.8452 6.19531 15.4883 6.19531C17.1314 6.19531 18.7072 6.8481 19.8691 8.01006C21.0309 9.17202 21.6837 10.748 21.6837 12.3912Z" fill="#95555D"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.8564 30.9673C6.59572 30.6358 0 23.8327 0 15.4898C0 6.9348 6.93414 0 15.4884 0C24.0426 0 30.9767 6.9348 30.9767 15.4898C30.9767 24.0449 24.0426 30.9797 15.4884 30.9797C15.4176 30.9801 15.3469 30.9801 15.2762 30.9797C15.136 30.9797 14.9958 30.975 14.8564 30.9673ZM5.54948 25.2639C5.43368 24.9313 5.39426 24.5769 5.43416 24.227C5.47405 23.8771 5.59224 23.5407 5.77993 23.2427C5.96763 22.9447 6.22002 22.6928 6.51838 22.5058C6.81673 22.3187 7.15338 22.2012 7.50334 22.1621C13.5407 21.4937 17.4732 21.5541 23.4811 22.176C23.8316 22.2125 24.1691 22.3285 24.4679 22.5152C24.7667 22.7018 25.019 22.9542 25.2056 23.2531C25.3921 23.552 25.508 23.8896 25.5444 24.24C25.5808 24.5905 25.5368 24.9447 25.4156 25.2755C27.9905 22.6701 29.4325 19.1531 29.4279 15.4898C29.4279 7.79061 23.1869 1.54898 15.4884 1.54898C7.78988 1.54898 1.54884 7.79061 1.54884 15.4898C1.54884 19.2972 3.07522 22.7484 5.54948 25.2639Z" fill="#95555D"/>
    </svg>`


  return (
    <>
    <span dangerouslySetInnerHTML={{__html:profiletab}}  style={{cursor:'pointer'}} title='Profile'></span>
    </>
  )
}
