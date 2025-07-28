import { LeadershipProfile } from './types';

/**
 * An array of leadership profiles for the church.
 * Each profile includes a name, role, and a unique image URL from picsum.photos.
 * The seeds for the images are kept consistent for a stable UI.
 */
export const LEADERSHIP_PROFILES: LeadershipProfile[] = [
  {
    name: "Rory & Liane Axcell",
    role: "Eldership",
    imageUrl: "https://picsum.photos/seed/rory-liane/500/500",
  },
  {
    name: "Gary & Lisa-Marie Marques",
    role: "Eldership",
    imageUrl: "https://picsum.photos/seed/gary-lisa/500/500",
  },
  {
    name: "Graham & Tracy Lowry",
    role: "Eldership",
    imageUrl: "https://picsum.photos/seed/graham-tracy/500/500",
  },
  {
    name: "Brian & Mandy Capper",
    role: "Deacons",
    imageUrl: "https://picsum.photos/seed/brian-mandy/500/500",
  },
  {
    name: "Gareth & Ashleigh Axcell",
    role: "Deacons",
    imageUrl: "https://picsum.photos/seed/gareth-ashleigh/500/500",
  },
  {
    name: "Greg & Natalie Downes",
    role: "Deacons",
    imageUrl: "https://picsum.photos/seed/greg-natalie/500/500",
  },
];

/**
 * The full text of the Living Hope Church's Statement of Faith.
 * This constant is used as the primary knowledge base for the Gemini AI assistant
 * in the Beliefs section.
 */
export const WHAT_WE_BELIEVE_TEXT = `
Statement of Faith for Living Hope Church:
1.  **The Bible**: We believe the Bible, as originally given, to be the inspired, infallible and authoritative Word of God. It is the all-sufficient rule for our faith and practice.
2.  **The Trinity**: We believe in one God, eternally existent in three persons: Father, Son and Holy Spirit.
3.  **Jesus Christ**: We believe in the deity of our Lord Jesus Christ, His virgin birth, His sinless life, His miracles, His atoning death on the cross, His bodily resurrection, His ascension to the right hand of the Father and His personal return in power and glory.
4.  **Humanity & Salvation**: We believe that man was created in the image of God but fell into sin and is therefore lost. Only through regeneration by the Holy Spirit can salvation and spiritual life be obtained. The shed blood of Jesus Christ and His resurrection provide the only ground for justification and salvation.
5.  **The Holy Spirit**: We believe in the present ministry of the Holy Spirit, by whose indwelling the Christian is enabled to live a godly life.
6.  **The Church**: We believe in the spiritual unity of believers in our Lord Jesus Christ, who is the Head of the church.
7.  **The Resurrection & Future**: We believe in the resurrection of both the saved and the lost; they that are saved unto the resurrection of life, and they that are lost unto the resurrection of damnation.
`;
