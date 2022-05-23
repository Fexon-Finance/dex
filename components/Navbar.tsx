import Image from 'next/image';
import { Popover, Transition } from '@headlessui/react';
import {
  MenuIcon,
  XIcon,
} from '@heroicons/react/outline';
import { Fragment } from 'react';
import Link from 'next/link';
import { ConnectWallet } from '.';

export function Navbar() {
  const navigation = [
    [ 'Home', '#' ],
    [ 'About', '#about' ],
    [ 'Docs', '#docs' ],
  ];

  return (
    <div className="sticky top-0 left-0 right-0 z-50">
      <Popover className="bg-black absolute top-0 left-0 right-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-6 md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1 text-gray-200 flex-col font-semibold">
              {/* <Image src="/logos/logo-green.svg" width={42} height={42} /> */}
              <p>Fexon</p>
              <p>Finance</p>
            </div>

            <Popover.Group as="div" className="md:flex justify-end space-x-8 lg:flex-1">
              <ConnectWallet />
            </Popover.Group>
          </div>
        </div>
      </Popover>
    </div>

  );
}
