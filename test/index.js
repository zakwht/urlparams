const { URLQuery } = require("../lib")
const assert = require('assert');

window = { location: { search: "?artist=Tyler, The Creator&album=IGOR&trackNum=10&shuffle=false&replay=true&test=0" } }

const fixtures = {
  'toString': "artist=Tyler%2C+The+Creator&album=IGOR&trackNum=10&shuffle=false&replay=true&test=0",
  'toURLParams': new URLSearchParams("artist=Tyler%2C+The+Creator&album=IGOR&trackNum=10&shuffle=false&replay=true&test=0"),
  'toObject':   {
    artist: "Tyler, The Creator",
    album: "IGOR",
    trackNum: "10",
    shuffle: "false",
    replay: "true",
    test: "0"
  },
  'toCastedObject':   {
    artist: "Tyler, The Creator",
    album: "IGOR",
    trackNum: 10,
    shuffle: false,
    replay: true,
    test: 0
  }
}

const searches = [
  undefined,
  "?artist=Tyler, The Creator&album=IGOR&trackNum=10&shuffle=false&replay=true&test=0",
  "https://spotify.com?artist=Tyler, The Creator&album=IGOR&trackNum=10&shuffle=false&replay=true&test=0#title",
  {
    artist: "Tyler, The Creator",
    album: "IGOR",
    trackNum: "10",
    shuffle: "false",
    replay: "true",
    test: "0",
    emptyString: '',
    undefined: undefined
  },
  new URLSearchParams("?artist=Tyler, The Creator&album=IGOR&trackNum=10&shuffle=false&replay=true&test=0")
]

searches.forEach(s => {
  const q = new URLQuery(s)
  assert(q.toString() === fixtures.toString)
  assert(JSON.stringify(q.toObject()) === JSON.stringify(fixtures.toObject))
  assert(JSON.stringify(q.toURLParams().entries()) === JSON.stringify(fixtures.toURLParams.entries()))
  assert(JSON.stringify(q.toCastedObject()) === JSON.stringify(fixtures.toCastedObject))
})


