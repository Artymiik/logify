const Client = require("../cmd/client");

function main() {
  // 1) router 2) method 3) токен 4) данные 5) потоки
  const client = new Client(route, "POST", token, data, 200);
  client.sendRequest();
}

// инициализация кллиента
const route = "create/site";
// хранения токена
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVkQXQiOjE3MzExMzc3ODksInVzZXJJZCI6IjEifQ.pqW4b9ZMGoKFRMTWCAilGyZm-kZk-LKE0pPCuw9dOIU";

// данные для отправки
const data = [
  {
    name: "Portfolio 1",
    description:
      "A modern portfolio showcasing web design and development projects.",
    link: "https://www.awwwards.com/",
  },
  {
    name: "Portfolio 2",
    description:
      "A creative portfolio featuring photography, graphic design, and branding work.",
    link: "https://dribbble.com/",
  },
  {
    name: "Portfolio 3",
    description:
      "A minimalist portfolio highlighting freelance writing and content creation projects.",
    link: "https://www.theguardian.com/",
  },
  {
    name: "Portfolio 4",
    description:
      "An interactive portfolio showcasing UI/UX design projects and case studies.",
    link: "https://www.behance.net/",
  },
  {
    name: "Portfolio 5",
    description:
      "A portfolio showcasing web development projects with a focus on front-end technologies.",
    link: "https://codepen.io/",
  },
  {
    name: "Portfolio 6",
    description:
      "A portfolio featuring graphic design projects with a focus on branding and identity design.",
    link: "https://www.canva.com/",
  },
  {
    name: "Portfolio 7",
    description:
      "A portfolio showcasing a wide range of design and development projects, from web design to mobile apps.",
    link: "https://www.creativeboom.com/",
  },
  {
    name: "Portfolio 8",
    description:
      "A portfolio highlighting freelance writing and content creation projects for various industries.",
    link: "https://www.copyblogger.com/",
  },
  {
    name: "Portfolio 9",
    description:
      "An interactive portfolio showcasing UI/UX design projects with a focus on user research and usability testing.",
    link: "https://uxplanet.org/",
  },
  {
    name: "Portfolio 10",
    description:
      "A portfolio showcasing web development projects with a focus on back-end technologies and databases.",
    link: "https://www.mongodb.com/",
  },
  {
    name: "Portfolio 11",
    description:
      "A portfolio featuring graphic design projects with a focus on illustration and visual storytelling.",
    link: "https://www.shutterstock.com/",
  },
  {
    name: "Portfolio 12",
    description:
      "A portfolio showcasing a wide range of design and development projects, from branding to web design to marketing materials.",
    link: "https://www.pinterest.com/",
  },
  {
    name: "Portfolio 13",
    description:
      "A portfolio highlighting freelance writing and content creation projects for businesses and organizations.",
    link: "https://www.forbes.com/",
  },
  {
    name: "Portfolio 14",
    description:
      "An interactive portfolio showcasing UI/UX design projects with a focus on accessibility and inclusive design.",
    link: "https://www.a11yproject.com/",
  },
  {
    name: "Portfolio 15",
    description:
      "A portfolio showcasing web development projects with a focus on web security and performance optimization.",
    link: "https://www.cloudflare.com/",
  },
  {
    name: "Portfolio 16",
    description:
      "A portfolio featuring graphic design projects with a focus on typography and visual hierarchy.",
    link: "https://www.fontsinuse.com/",
  },
  {
    name: "Portfolio 17",
    description:
      "A portfolio showcasing a wide range of design and development projects, from website redesigns to mobile app development.",
    link: "https://www.smashingmagazine.com/",
  },
  {
    name: "Portfolio 18",
    description:
      "A portfolio highlighting freelance writing and content creation projects for blogs and online publications.",
    link: "https://medium.com/",
  },
  {
    name: "Portfolio 19",
    description:
      "An interactive portfolio showcasing UI/UX design projects with a focus on user experience research and prototyping.",
    link: "https://www.invisionapp.com/",
  },
  {
    name: "Portfolio 20",
    description:
      "A portfolio showcasing web development projects with a focus on e-commerce platforms and online stores.",
    link: "https://www.shopify.com/",
  },
  {
    name: "Portfolio 21",
    description:
      "A portfolio featuring graphic design projects with a focus on branding and logo design.",
    link: "https://99designs.com/",
  },
  {
    name: "Portfolio 22",
    description:
      "A portfolio showcasing a wide range of design and development projects, from branding and marketing to web and mobile app development.",
    link: "https://www.linkedin.com/",
  },
  {
    name: "Portfolio 23",
    description:
      "A portfolio highlighting freelance writing and content creation projects for businesses and individuals.",
    link: "https://www.upwork.com/",
  },
  {
    name: "Portfolio 24",
    description:
      "An interactive portfolio showcasing UI/UX design projects with a focus on user-centered design principles.",
    link: "https://www.uxpin.com/",
  },
  {
    name: "Portfolio 25",
    description:
      "A portfolio showcasing web development projects with a focus on accessibility and inclusive design.",
    link: "https://www.w3.org/",
  },
  {
    name: "Portfolio 26",
    description:
      "A portfolio featuring graphic design projects with a focus on data visualization and infographics.",
    link: "https://www.tableau.com/",
  },
  {
    name: "Portfolio 27",
    description:
      "A portfolio showcasing a wide range of design and development projects, from social media marketing to web and mobile app development.",
    link: "https://www.facebook.com/",
  },
  {
    name: "Portfolio 28",
    description:
      "A portfolio highlighting freelance writing and content creation projects for various publications and platforms.",
    link: "https://www.nytimes.com/",
  },
  {
    name: "Portfolio 29",
    description:
      "An interactive portfolio showcasing UI/UX design projects with a focus on user experience research and prototyping.",
    link: "https://www.figma.com/",
  },
  {
    name: "Portfolio 30",
    description:
      "A portfolio showcasing web development projects with a focus on search engine optimization (SEO) and digital marketing.",
    link: "https://www.google.com/",
  },
  {
    name: "Portfolio 31",
    description:
      "A portfolio featuring graphic design projects with a focus on branding and logo design.",
    link: "https://www.logoipsum.com/",
  },
  {
    name: "Portfolio 32",
    description:
      "A portfolio showcasing a wide range of design and development projects, from branding and marketing to web and mobile app development.",
    link: "https://www.instagram.com/",
  },
  {
    name: "Portfolio 33",
    description:
      "A portfolio highlighting freelance writing and content creation projects for businesses and individuals.",
    link: "https://www.freelancer.com/",
  },
  {
    name: "Portfolio 34",
    description:
      "An interactive portfolio showcasing UI/UX design projects with a focus on user-centered design principles.",
    link: "https://www.webflow.com/",
  },
  {
    name: "Portfolio 35",
    description:
      "A portfolio showcasing web development projects with a focus on accessibility and inclusive design.",
    link: "https://www.w3schools.com/",
  },
  {
    name: "Portfolio 36",
    description:
      "A portfolio featuring graphic design projects with a focus on data visualization and infographics.",
    link: "https://www.datawrapper.de/",
  },
  {
    name: "Portfolio 37",
    description:
      "A portfolio showcasing a wide range of design and development projects, from social media marketing to web and mobile app development.",
    link: "https://www.twitter.com/",
  },
  {
    name: "Portfolio 38",
    description:
      "A portfolio highlighting freelance writing and content creation projects for various publications and platforms.",
    link: "https://www.bbc.com/",
  },
  {
    name: "Portfolio 39",
    description:
      "An interactive portfolio showcasing UI/UX design projects with a focus on user experience research and prototyping.",
    link: "https://www.adobe.com/",
  },
  {
    name: "Portfolio 40",
    description:
      "A portfolio showcasing web development projects with a focus on search engine optimization (SEO) and digital marketing.",
    link: "https://www.bing.com/",
  },
  {
    name: "Portfolio 41",
    description:
      "A portfolio showcasing web development projects with a focus on creating interactive and engaging user experiences.",
    link: "https://www.uxcollective.com/",
  },
  {
    name: "Portfolio 42",
    description:
      "A portfolio featuring graphic design projects with a focus on branding and identity design for small businesses.",
    link: "https://www.99designs.com/",
  },
  {
    name: "Portfolio 43",
    description:
      "A portfolio showcasing a wide range of design and development projects, from website redesigns to mobile app development.",
    link: "https://www.sitepoint.com/",
  },
  {
    name: "Portfolio 44",
    description:
      "A portfolio highlighting freelance writing and content creation projects for blogs and online publications.",
    link: "https://www.contently.com/",
  },
  {
    name: "Portfolio 45",
    description:
      "An interactive portfolio showcasing UI/UX design projects with a focus on user experience research and prototyping.",
    link: "https://www.proto.io/",
  },
  {
    name: "Portfolio 46",
    description:
      "A portfolio showcasing web development projects with a focus on e-commerce platforms and online stores.",
    link: "https://www.bigcommerce.com/",
  },
  {
    name: "Portfolio 47",
    description:
      "A portfolio featuring graphic design projects with a focus on branding and logo design.",
    link: "https://www.logaster.com/",
  },
  {
    name: "Portfolio 48",
    description:
      "A portfolio showcasing a wide range of design and development projects, from branding and marketing to web and mobile app development.",
    link: "https://www.envato.com/",
  },
  {
    name: "Portfolio 49",
    description:
      "A portfolio highlighting freelance writing and content creation projects for businesses and individuals.",
    link: "https://www.fiverr.com/",
  },
  {
    name: "Portfolio 50",
    description:
      "An interactive portfolio showcasing UI/UX design projects with a focus on user-centered design principles.",
    link: "https://www.balsamiq.com/",
  },
  {
    name: "Portfolio 51",
    description:
      "A portfolio showcasing web development projects with a focus on accessibility and inclusive design.",
    link: "https://www.webaim.org/",
  },
  {
    name: "Portfolio 52",
    description:
      "A portfolio featuring graphic design projects with a focus on data visualization and infographics.",
    link: "https://www.infogram.com/",
  },
  {
    name: "Portfolio 53",
    description:
      "A portfolio showcasing a wide range of design and development projects, from social media marketing to web and mobile app development.",
    link: "https://www.pinterest.com/",
  },
  {
    name: "Portfolio 54",
    description:
      "A portfolio highlighting freelance writing and content creation projects for various publications and platforms.",
    link: "https://www.theatlantic.com/",
  },
  {
    name: "Portfolio 55",
    description:
      "An interactive portfolio showcasing UI/UX design projects with a focus on user experience research and prototyping.",
    link: "https://www.marvelapp.com/",
  },
  {
    name: "Portfolio 56",
    description:
      "A portfolio showcasing web development projects with a focus on search engine optimization (SEO) and digital marketing.",
    link: "https://www.moz.com/",
  },
  {
    name: "Portfolio 57",
    description:
      "A portfolio featuring graphic design projects with a focus on branding and logo design.",
    link: "https://www.designcrowd.com/",
  },
  {
    name: "Portfolio 58",
    description:
      "A portfolio showcasing a wide range of design and development projects, from branding and marketing to web and mobile app development.",
    link: "https://www.behance.net/",
  },
  {
    name: "Portfolio 59",
    description:
      "A portfolio highlighting freelance writing and content creation projects for businesses and individuals.",
    link: "https://www.prolific.co/",
  },
  {
    name: "Portfolio 60",
    description:
      "An interactive portfolio showcasing UI/UX design projects with a focus on user-centered design principles.",
    link: "https://www.justinmind.com/",
  },
  {
    name: "Portfolio 61",
    description:
      "A portfolio showcasing web development projects with a focus on accessibility and inclusive design.",
    link: "https://www.deque.com/",
  },
  {
    name: "Portfolio 62",
    description:
      "A portfolio featuring graphic design projects with a focus on data visualization and infographics.",
    link: "https://www.visual.ly/",
  },
  {
    name: "Portfolio 63",
    description:
      "A portfolio showcasing a wide range of design and development projects, from social media marketing to web and mobile app development.",
    link: "https://www.reddit.com/",
  },
  {
    name: "Portfolio 64",
    description:
      "A portfolio highlighting freelance writing and content creation projects for various publications and platforms.",
    link: "https://www.wired.com/",
  },
  {
    name: "Portfolio 65",
    description:
      "An interactive portfolio showcasing UI/UX design projects with a focus on user experience research and prototyping.",
    link: "https://www.adobe.com/",
  },
  {
    name: "Portfolio 66",
    description:
      "A portfolio showcasing web development projects with a focus on search engine optimization (SEO) and digital marketing.",
    link: "https://www.semrush.com/",
  },
  {
    name: "Portfolio 67",
    description:
      "A portfolio featuring graphic design projects with a focus on branding and logo design.",
    link: "https://www.brandcrowd.com/",
  },
  {
    name: "Portfolio 68",
    description:
      "A portfolio showcasing a wide range of design and development projects, from branding and marketing to web and mobile app development.",
    link: "https://www.youtube.com/",
  },
  {
    name: "Portfolio 69",
    description:
      "A portfolio highlighting freelance writing and content creation projects for businesses and individuals.",
    link: "https://www.guru.com/",
  },
  {
    name: "Portfolio 70",
    description:
      "An interactive portfolio showcasing UI/UX design projects with a focus on user-centered design principles.",
    link: "https://www.mockplus.com/",
  },
  {
    name: "Portfolio 71",
    description:
      "A portfolio showcasing web development projects with a focus on accessibility and inclusive design.",
    link: "https://www.a11yproject.com/",
  },
  {
    name: "Portfolio 72",
    description:
      "A portfolio featuring graphic design projects with a focus on data visualization and infographics.",
    link: "https://www.easel.ly/",
  },
  {
    name: "Portfolio 73",
    description:
      "A portfolio showcasing a wide range of design and development projects, from social media marketing to web and mobile app development.",
    link: "https://www.tiktok.com/",
  },
  {
    name: "Portfolio 74",
    description:
      "A portfolio highlighting freelance writing and content creation projects for various publications and platforms.",
    link: "https://www.vox.com/",
  },
  {
    name: "Portfolio 75",
    description:
      "An interactive portfolio showcasing UI/UX design projects with a focus on user experience research and prototyping.",
    link: "https://www.sketch.com/",
  },
  {
    name: "Portfolio 76",
    description:
      "A portfolio showcasing web development projects with a focus on search engine optimization (SEO) and digital marketing.",
    link: "https://www.hrefs.com/",
  },
  {
    name: "Portfolio 77",
    description:
      "A portfolio featuring graphic design projects with a focus on branding and logo design.",
    link: "https://www.looka.com/",
  },
  {
    name: "Portfolio 78",
    description:
      "A portfolio showcasing a wide range of design and development projects, from branding and marketing to web and mobile app development.",
    link: "https://www.dribbble.com/",
  },
  {
    name: "Portfolio 79",
    description:
      "A portfolio highlighting freelance writing and content creation projects for businesses and individuals.",
    link: "https://www.peopleperhour.com/",
  },
  {
    name: "Portfolio 80",
    description:
      "An interactive portfolio showcasing UI/UX design projects with a focus on user-centered design principles.",
    link: "https://www.uxpin.com/",
  },
  {
    name: "Portfolio 81",
    description: "A minimalist portfolio showcasing UI/UX design projects.",
    link: "https://www.behance.net/",
  },
  {
    name: "Portfolio 82",
    description: "A portfolio for freelance writers and bloggers.",
    link: "https://medium.com/",
  },
  {
    name: "Portfolio 83",
    description:
      "A portfolio for graphic designers specializing in illustration.",
    link: "https://www.deviantart.com/",
  },
  {
    name: "Portfolio 84",
    description: "A portfolio for photographers with a focus on nature.",
    link: "https://unsplash.com/",
  },
  {
    name: "Portfolio 85",
    description:
      "A portfolio showcasing web development with a focus on React.",
    link: "https://codesandbox.io/",
  },
  {
    name: "Portfolio 86",
    description: "A portfolio for web developers specializing in WordPress.",
    link: "https://wordpress.org/",
  },
  {
    name: "Portfolio 87",
    description: "A portfolio showcasing motion graphics and animation.",
    link: "https://www.motionographer.com/",
  },
  {
    name: "Portfolio 88",
    description: "A portfolio for digital marketers and social media managers.",
    link: "https://www.hootsuite.com/",
  },
  {
    name: "Portfolio 89",
    description: "A portfolio showcasing data visualization and infographics.",
    link: "https://www.datawrapper.de/",
  },
  {
    name: "Portfolio 90",
    description: "A portfolio for game developers showcasing their projects.",
    link: "https://itch.io/",
  },
  {
    name: "Portfolio 91",
    description:
      "A portfolio for designers working with 3D modeling and animation.",
    link: "https://www.turbosquid.com/",
  },
  {
    name: "Portfolio 92",
    description: "A portfolio for UX researchers showcasing their findings.",
    link: "https://uxplanet.org/",
  },
  {
    name: "Portfolio 93",
    description:
      "A portfolio for product designers with a focus on mobile apps.",
    link: "https://www.producthunt.com/",
  },
  {
    name: "Portfolio 94",
    description:
      "A portfolio for designers working with user interface libraries and frameworks.",
    link: "https://material.io/",
  },
  {
    name: "Portfolio 95",
    description:
      "A portfolio for designers working with web accessibility and inclusivity.",
    link: "https://webaim.org/",
  },
  {
    name: "Portfolio 96",
    description: "A portfolio for artists showcasing their digital paintings.",
    link: "https://www.artstation.com/",
  },
  {
    name: "Portfolio 97",
    description: "A portfolio for musicians showcasing their original work.",
    link: "https://soundcloud.com/",
  },
  {
    name: "Portfolio 98",
    description: "A portfolio for writers showcasing their published works.",
    link: "https://www.goodreads.com/",
  },
  {
    name: "Portfolio 99",
    description: "A portfolio for videographers showcasing their work.",
    link: "https://vimeo.com/",
  },
  {
    name: "Portfolio 100",
    description:
      "A portfolio for graphic designers specializing in logo design.",
    link: "https://99designs.com/",
  },
  {
    name: "Portfolio 101",
    description: "A portfolio for web developers specializing in front-end.",
    link: "https://www.css-tricks.com/",
  },
  {
    name: "Portfolio 102",
    description: "A portfolio for designers working with user experience.",
    link: "https://www.nngroup.com/",
  },
  {
    name: "Portfolio 103",
    description: "A portfolio for designers working with typography.",
    link: "https://www.fonts.com/",
  },
  {
    name: "Portfolio 104",
    description: "A portfolio for designers working with color theory.",
    link: "https://coolors.co/",
  },
  {
    name: "Portfolio 105",
    description: "A portfolio for designers working with branding.",
    link: "https://www.brandcrowd.com/",
  },
  {
    name: "Portfolio 128",
    description:
      "A portfolio for designers working with website design and development.",
    link: "https://www.wix.com/",
  },
  {
    name: "Portfolio 129",
    description:
      "A portfolio for designers working with web development using JavaScript.",
    link: "https://www.javascript.com/",
  },
  {
    name: "Portfolio 130",
    description: "A portfolio for designers working with mobile app design.",
    link: "https://www.figma.com/",
  },
  {
    name: "Portfolio 131",
    description: "A portfolio for designers working with user research.",
    link: "https://www.usertesting.com/",
  },
  {
    name: "Portfolio 132",
    description:
      "A portfolio for designers working with information architecture.",
    link: "https://www.uie.com/",
  },
  {
    name: "Portfolio 133",
    description: "A portfolio for designers working with interaction design.",
    link: "https://www.interaction-design.org/",
  },
  {
    name: "Portfolio 134",
    description: "A portfolio for designers working with visual design.",
    link: "https://www.canva.com/",
  },
  {
    name: "Portfolio 135",
    description: "A portfolio for designers working with graphic design.",
    link: "https://www.adobe.com/products/photoshop.html",
  },
  {
    name: "Portfolio 136",
    description: "A portfolio for designers working with web design.",
    link: "https://www.google.com/design/",
  },
  {
    name: "Portfolio 137",
    description:
      "A portfolio for designers working with user experience research.",
    link: "https://www.nngroup.com/",
  },
  {
    name: "Portfolio 138",
    description:
      "A portfolio for designers working with user interface design.",
    link: "https://www.invisionapp.com/",
  },
  {
    name: "Portfolio 139",
    description: "A portfolio for designers working with product design.",
    link: "https://www.dribbble.com/",
  },
  {
    name: "Portfolio 140",
    description:
      "A portfolio for designers working with branding and identity.",
    link: "https://www.logodesign.net/",
  },
  {
    name: "Portfolio 141",
    description:
      "A portfolio for designers working with graphic design for social media.",
    link: "https://www.canva.com/",
  },
  {
    name: "Portfolio 142",
    description:
      "A portfolio for designers working with web development using HTML, CSS, and JavaScript.",
    link: "https://www.w3schools.com/",
  },
  {
    name: "Portfolio 143",
    description:
      "A portfolio for designers working with web development using React.",
    link: "https://reactjs.org/",
  },
  {
    name: "Portfolio 144",
    description:
      "A portfolio for designers working with web development using Angular.",
    link: "https://angular.io/",
  },
  {
    name: "Portfolio 145",
    description:
      "A portfolio for designers working with web development using Vue.",
    link: "https://vuejs.org/",
  },
  {
    name: "Portfolio 146",
    description:
      "A portfolio for designers working with web development using Node.js.",
    link: "https://nodejs.org/",
  },
  {
    name: "Portfolio 147",
    description:
      "A portfolio for designers working with web development using Python.",
    link: "https://www.python.org/",
  },
  {
    name: "Portfolio 148",
    description:
      "A portfolio for designers working with web development using PHP.",
    link: "https://www.php.net/",
  },
  {
    name: "Portfolio 149",
    description:
      "A portfolio for designers working with web development using Ruby.",
    link: "https://www.ruby-lang.org/",
  },
  {
    name: "Portfolio 150",
    description:
      "A portfolio for designers working with web development using Java.",
    link: "https://www.oracle.com/java/",
  },
  {
    name: "Portfolio 151",
    description:
      "A portfolio for designers working with web development using C#.",
    link: "https://docs.microsoft.com/en-us/dotnet/csharp/",
  },
  {
    name: "Portfolio 152",
    description:
      "A portfolio for designers working with web development using Swift.",
    link: "https://developer.apple.com/swift/",
  },
  {
    name: "Portfolio 153",
    description:
      "A portfolio for designers working with web development using Kotlin.",
    link: "https://kotlinlang.org/",
  },
  {
    name: "Portfolio 154",
    description:
      "A portfolio for designers working with web development using Go.",
    link: "https://golang.org/",
  },
  {
    name: "Portfolio 155",
    description:
      "A portfolio for designers working with web development using Rust.",
    link: "https://www.rust-lang.org/",
  },
  {
    name: "Portfolio 156",
    description:
      "A portfolio for designers working with web development using C++.",
    link: "https://www.cplusplus.com/",
  },
  {
    name: "Portfolio 157",
    description:
      "A portfolio for designers working with web development using C.",
    link: "https://www.cprogramming.com/",
  },
  {
    name: "Portfolio 158",
    description:
      "A portfolio for designers working with web development using Assembly.",
    link: "https://en.wikipedia.org/wiki/Assembly_language",
  },
  {
    name: "Portfolio 159",
    description:
      "A portfolio for designers working with web development using SQL.",
    link: "https://www.w3schools.com/sql/",
  },
  {
    name: "Portfolio 160",
    description:
      "A portfolio for designers working with web development using NoSQL.",
    link: "https://en.wikipedia.org/wiki/NoSQL",
  },
  {
    name: "Portfolio 161",
    description:
      "A portfolio for designers working with web development using Git.",
    link: "https://git-scm.com/",
  },
  {
    name: "Portfolio 162",
    description:
      "A portfolio for designers working with web development using GitHub.",
    link: "https://github.com/",
  },
  {
    name: "Portfolio 163",
    description:
      "A portfolio for designers working with web development using Bitbucket.",
    link: "https://bitbucket.org/",
  },
  {
    name: "Portfolio 164",
    description:
      "A portfolio for designers working with web development using AWS.",
    link: "https://aws.amazon.com/",
  },
  {
    name: "Portfolio 165",
    description:
      "A portfolio for designers working with web development using Google Cloud.",
    link: "https://cloud.google.com/",
  },
  {
    name: "Portfolio 166",
    description:
      "A portfolio for designers working with web development using Azure.",
    link: "https://azure.microsoft.com/",
  },
  {
    name: "Portfolio 167",
    description:
      "A portfolio for designers working with web development using Heroku.",
    link: "https://www.heroku.com/",
  },
  {
    name: "Portfolio 168",
    description:
      "A portfolio for designers working with web development using Netlify.",
    link: "https://www.netlify.com/",
  },
  {
    name: "Portfolio 169",
    description:
      "A portfolio for designers working with web development using Vercel.",
    link: "https://vercel.com/",
  },
  {
    name: "Portfolio 170",
    description:
      "A portfolio for designers working with web development using Docker.",
    link: "https://www.docker.com/",
  },
  {
    name: "Portfolio 171",
    description:
      "A portfolio for designers working with web development using Kubernetes.",
    link: "https://kubernetes.io/",
  },
  {
    name: "Portfolio 172",
    description:
      "A portfolio for designers working with web development using Terraform.",
    link: "https://www.terraform.io/",
  },
  {
    name: "Portfolio 173",
    description:
      "A portfolio for designers working with web development using Ansible.",
    link: "https://www.ansible.com/",
  },
  {
    name: "Portfolio 174",
    description:
      "A portfolio for designers working with web development using Chef.",
    link: "https://www.chef.io/",
  },
  {
    name: "Portfolio 175",
    description:
      "A portfolio for designers working with web development using Puppet.",
    link: "https://puppet.com/",
  },
  {
    name: "Portfolio 176",
    description:
      "A portfolio for designers working with web development using Jenkins.",
    link: "https://www.jenkins.io/",
  },
  {
    name: "Portfolio 177",
    description:
      "A portfolio for designers working with web development using CircleCI.",
    link: "https://circleci.com/",
  },
  {
    name: "Portfolio 178",
    description:
      "A portfolio for designers working with web development using Travis CI.",
    link: "https://travis-ci.org/",
  },
  {
    name: "Portfolio 179",
    description:
      "A portfolio for designers working with web development using GitLab CI.",
    link: "https://gitlab.com/",
  },
  {
    name: "Portfolio 180",
    description:
      "A portfolio for designers working with web development using Azure DevOps.",
    link: "https://azure.microsoft.com/en-us/services/devops/",
  },
];

main();
