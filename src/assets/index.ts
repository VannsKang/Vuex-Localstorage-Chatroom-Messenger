// LINK fontawesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSignal } from '@fortawesome/free-solid-svg-icons';
import { faWifi } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faStopwatch } from '@fortawesome/free-solid-svg-icons';
import { faBatteryHalf } from '@fortawesome/free-solid-svg-icons';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faPalette } from '@fortawesome/free-solid-svg-icons';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { faBluetoothB } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(
	faSignal,
	faWifi,
	faLocationArrow,
	faLock,
	faStopwatch,
	faBluetoothB,
	faSignInAlt,
	faBatteryHalf,
	faPalette,
	faTrashAlt,
	faBars,
	faAngleLeft,
	faUser,
	faMagnifyingGlass,
	faImage,
	faEnvelope
);

export default { FontAwesomeIcon };

// LINK SVG
export * from './chat-send';
export * from './nav-avatar';
export * from './nav-back';
export * from './nav-hamburger';
export * from './nav-search';
export * from './nav-upload';
