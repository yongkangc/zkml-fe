import React, { useState } from 'react' // import state

import Image from 'next/image'

import { ConnectButton } from '@rainbow-me/rainbowkit'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

import bananaLogo from '../public/banana-logo.svg'
import Link from 'next/link'

export default function Header(isConnected) {
  const [isNavOpen, setIsNavOpen] = useState(false) // initiate isNavOpen state with false

  return (
    <div className="flex items-center justify-between border-b border-gray-400 py-8 px-20">
      <Link href="/" className="flex items-center">
        <h1 className="text-4xl">GELKIN</h1>
      </Link>
      <nav>
        <section className="MOBILE-MENU flex lg:hidden">
          <div
            className="HAMBURGER-ICON space-y-2"
            onClick={() => setIsNavOpen((prev) => !prev)} // toggle isNavOpen state on click
          >
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
          </div>

          <div className={isNavOpen ? 'showMenuNav' : 'hideMenuNav'}>
            <div
              className="CROSS-ICON absolute top-0 right-0 px-8 py-8"
              onClick={() => setIsNavOpen(false)} // change isNavOpen state to false to close the menu
            >
              <svg
                className="h-8 w-8 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>

            <ul className="MENU-LINK-MOBILE-OPEN flex flex-col items-center justify-between min-h-[250px]">
              {isConnected && (
                <li>
                  <ConnectButton
                    chainStatus="none"
                    showBalance={{
                      smallScreen: false,
                      largeScreen: true,
                    }}
                  />
                </li>
              )}
              <li>
                <a target="_blank" href="https://linktr.ee/gelkin">
                  <span className="text-black transition hover:text-gray-500/75 mt-5 hover:cursor-pointer">
                    PROJECT
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </section>

        <ul className="DESKTOP-MENU hidden space-x-8 lg:flex">
          <span className="">
            {isConnected && (
              <li>
                <ConnectButton
                  chainStatus="none"
                  showBalance={{
                    smallScreen: false,
                    largeScreen: true,
                  }}
                />
              </li>
            )}
          </span>
          <span className="mt-2">
            <li>
              <a target="_blank" href="https://linktr.ee/gelkin">
                <span className="text-black transition hover:text-gray-500/75 hover:cursor-pointer">
                  PROJECT
                </span>
              </a>
            </li>
          </span>
          {/* <span className="mt-2">
            <li>
              <a
                target="_blank"
                href="https://medium.com/@spartanlabs/the-construction-of-the-soul-part-3-soulbound-token-with-zk-snark-implementation-900d808b9e79"
              >
                <span className="text-black transition hover:text-gray-500/75 hover:cursor-pointer">
                  ARTICLE
                </span>
              </a>
            </li>
          </span>

          <span className="mt-2">
            <li>
              <a target="_blank" href="https://twitter.com/TheSpartanLabs">
                <span>
                  <FontAwesomeIcon icon={faTwitter} />
                </span>
                <span className="text-black transition hover:text-gray-500/75 hover:cursor-pointer pl-1">
                  TWITTER
                </span>
              </a>
            </li>
          </span> */}
        </ul>
      </nav>
      <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background: white;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
    `}</style>
    </div>
  )
}
