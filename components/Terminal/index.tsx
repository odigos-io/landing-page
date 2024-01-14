import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import './style.css';
import SoundComponent from '../SoundComponent';

const CommandLineInterface = () => {
  return (
    <div
      style={{
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        padding: 50,
      }}
    >
      <div style={{ width: '70vw' }}>
        <div
          style={{
            background: '#e7e7e7',
            padding: 8,
            borderTopRightRadius: 8,
            borderTopLeftRadius: 8,
          }}
        >
          <div style={{ display: 'flex', gap: 4 }}>
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                background: 'red',
              }}
            />
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                background: 'orange',
              }}
            />
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                background: 'green',
              }}
            />
          </div>
        </div>
        <div
          style={{
            background: '#000',
            padding: 40,
            display: 'flex',
            height: 300,
            paddingTop: 100,
          }}
        >
          <div style={{ fontSize: 40 }}>{'$ '}</div>
          <div style={{ fontSize: 40, paddingLeft: 8 }}>{'odigos-cli >  '}</div>
          <div className="wrapper">
            <div className="typing-demo">odigos install...</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandLineInterface;
