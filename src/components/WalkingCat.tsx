import catWalkSprite from "../assets/white cat walk pixel.PNG";

const CAT_FRAME_WIDTH = 80; // width of ONE frame
const CAT_HEIGHT = 80; // height of the sprite (one row)
const TOTAL_FRAMES = 5; // using first row of sprite sheet

export default function WalkingCat() {
  return (
    <>
      <style>{`
        .cat {
          width: ${CAT_FRAME_WIDTH}px;
          height: ${CAT_HEIGHT}px;
          background-image: url('${catWalkSprite}');
          background-size: ${CAT_FRAME_WIDTH * TOTAL_FRAMES}px auto;
          background-repeat: no-repeat;
          background-position-y: 0px;
          image-rendering: pixelated;
          animation: walk 0.5s steps(${TOTAL_FRAMES}) infinite,
                     move 4s linear infinite;
          position: absolute;
          bottom: 30%;
        }

        @keyframes walk {
          from { background-position-x: 0px; }
          to   { background-position-x: -${CAT_FRAME_WIDTH * TOTAL_FRAMES}px; }
        }

        @keyframes move {
          from { left: -${CAT_FRAME_WIDTH}px; }
          to   { left: 100%; }
        }

        .stage {
          position: relative;
          width: 100%;
          height: 300px;
          overflow: hidden;
        }
      `}</style>

      <div className="stage">
        <div className="cat" />
      </div>
    </>
  );
}
