import { cn } from "@/lib/utils";
import Marquee from "@/components/magicui/marquee";
import { Link } from "react-router-dom";

const reviews = [
  {
    name: "K",
    username: "@k",
    body: "very well thought out products, highly recommend. have kept me in line with all of my personal and business goals and achievements",
    img: "/assets/images/avatars/k.jpg.jpg",
    link: "/profile/k",
  },
  {
    name: "Huge",
    username: "@Huge",
    body: "This app is amazing for college students! I used to struggle keeping track of all my class materials - lectures, readings, Youtube videos explaining concepts.",
    img: "/assets/images/avatars/huge.jpg",
    link: "/profile/huge",
  },
  {
    name: "Shane",
    username: "@Shane_afsar",
    body: "Started using this a few weeks ago as a part of a beta, and I’ve been blown away! No more hunting around random windows and chrome history to find what I was looking at days or weeks ago!",
    img: "/assets/images/avatars/mark.jpg",
    link: "/profile/shane_afsar",
  },
  {
    name: "Marcus",
    username: "@marcus_tan2",
    body: "Much underhyped tool compared to other products existing today that deal with note-taking, thinking, productivity etc.",
    img: "/assets/images/avatars/owl.jpg",
    link: "/profile/marcus_tan2",
  },
  {
    name: "Steve Gitau",
    username: "@steve_gitau",
    body: "I like this. It comes in very handy",
    img: "https://avatar.vercel.sh/jenny",
    link: "/profile/steve_gitau",
  },
  {
    name: "Jordan Walker",
    username: "@jwalker",
    body: "Can't help but think it's incredible 😉",
    img: "https://avatar.vercel.sh/james",
    link: "/profile/jwalker",
  },
  {
    name: "Marcus",
    username: "@marcus_tan2",
    body: "Much underhyped tool compared to other products existing today that deal with note-taking, thinking, productivity etc.",
    img: "/assets/images/avatars/owl.jpg",
    link: "/profile/marcus_tan2",
  },
  {
    name: "Steve Gitau",
    username: "@steve_gitau",
    body: "I like this. It comes in very handy",
    img: "https://avatar.vercel.sh/jenny",
    link: "/profile/steve_gitau",
  },
  {
    name: "Jordan Walker",
    username: "@jwalker",
    body: "Can't help but think it's incredible 😉",
    img: "https://avatar.vercel.sh/james",
    link: "/profile/jwalker",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
  link,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
  link: string;
}) => {
  return (
    <Link to={link}>
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
    </Link>
  );
};

export function MarqueeDemo() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}