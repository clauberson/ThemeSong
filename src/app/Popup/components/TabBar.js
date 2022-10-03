/** @jsx jsx */
// import React from 'react';
import { jsx, css } from '@emotion/react';
import TabButton from './TabButton';
// // import { changeActivePopupTab } from '../../popup/popupSlice';
import { useStore } from '../../store';

function TabBar() {
  // 
  // const activePopupTab = useSelector(state => state.popup.activePopupTab);
  const activePopupTab = useStore(state => state.popup.activePopupTab);
  const changeActivePopupTab = useStore(state => state.popup.changeActivePopupTab);
  
  function handleClick(id) {
    changeActivePopupTab(id)
    chrome.storage.local.set({activePopupTab: id})
  }

  return (
    <div id="TabBar" css={css`padding-top: 4px; background-color: #000;`}>
      <TabButton key={1} id={1} isActive={activePopupTab === 1} onClick={e => handleClick(1)}>Themes</TabButton>
      <TabButton key={2} id={2} isActive={activePopupTab === 2} onClick={e => handleClick(2)}>Visualizers</TabButton>
    </div>
  )
}

export default TabBar;