import ProgressBar from "@ramonak/react-progress-bar"


interface RankingProps {
    level: number;
    rankProgress: number;
}

const Ranking: React.FC<RankingProps> = ({ level, rankProgress}) => {

    // Changeable vars
    let imagePath1 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/unranked.png`;
    let imagePath2 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/unranked.png`;
    let background = 'rgba(79, 91, 142, 0.363)';
    let progressColor = '#4f5b8e';
    let rankWidth = 18;

    // Set styling data
    if (level === 0) {
        imagePath1 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/unranked.png`
        imagePath2 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/unranked.png`
        background = 'rgba(79, 91, 142, 0.363)'
        progressColor = '#4f5b8e'
      } else if (level === 1) {
        imagePath1 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_1.png`
        imagePath2 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_2.png`
        background = 'rgba(79, 91, 142, 0.363)'
        progressColor = '#4f5b8e'
        rankWidth = 20;
      } else if (level === 2) {
        imagePath1 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_2.png`
        imagePath2 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_3.png`
        background = 'rgba(79, 91, 142, 0.363)'
        progressColor = '#4f5b8e'
        rankWidth = 28;
      } else if (level === 3) {
        imagePath1 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_3.png`
        imagePath2 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_4.png`
        background = 'rgba(79, 91, 142, 0.363)'
        progressColor = '#4f5b8e'
        rankWidth = 28;
      } else if (level === 4) {
        imagePath1 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_4.png`
        imagePath2 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_5.png`
        background = 'rgba(79, 91, 142, 0.363)'
        progressColor = '#4f5b8e'
        rankWidth = 28;
      } else if (level === 5) {
        imagePath1 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_5.png`
        imagePath2 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_6.png`
        background = 'rgba(79, 91, 142, 0.363)'
        progressColor = '#4f5b8e'
        rankWidth = 28;
      } else if (level === 6) {
        imagePath1 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_6.png`
        imagePath2 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_7.png`
        background = 'rgba(244, 147, 43, 0.445)'
        progressColor = '#F4932B'
        rankWidth = 20;
      } else if (level === 7) {
        imagePath1 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_7.png`
        imagePath2 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_8.png`
        background = 'rgba(244, 147, 43, 0.445)'
        progressColor = '#F4932B'
        rankWidth = 28;
      } else if (level === 8) {
        imagePath1 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_8.png`
        imagePath2 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_9.png`
        background = 'rgba(244, 147, 43, 0.445)'
        progressColor = '#F4932B'
        rankWidth = 28;
      } else if (level === 9) {
        imagePath1 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_9.png`
        imagePath2 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_10.png`
        background = 'rgba(244, 147, 43, 0.445)'
        progressColor = '#F4932B'
        rankWidth = 28;
      } else if (level === 10) {
        imagePath1 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_10.png`
        imagePath2 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_11.png`
        background = 'rgba(244, 147, 43, 0.445)'
        progressColor = '#F4932B'
        rankWidth = 28;
      } else if (level === 11) {
        imagePath1 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_11.png`
        imagePath2 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_12.png`
        background = 'rgba(54, 155, 255, 0.432)'
        progressColor = '#369CFF'
      } else if (level === 12) {
        imagePath1 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_12.png`
        imagePath2 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_13.png`
        background = 'rgba(54, 155, 255, 0.432)'
        progressColor = '#369CFF'
      } else if (level === 13) {
        imagePath1 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_13.png`
        imagePath2 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_14.png`
        background = 'rgba(54, 155, 255, 0.432)'
        progressColor = '#369CFF'
        rankWidth = 22;
      } else if (level === 14) {
        imagePath1 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_14.png`
        imagePath2 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_15.png`
        background = 'rgba(54, 155, 255, 0.432)'
        progressColor = '#369CFF'
        rankWidth = 22;
      } else if (level === 15) {
        imagePath1 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_15.png`
        imagePath2 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_16.png`
        background = 'rgba(12, 186, 41, 0.404)'

        progressColor = '#0CBA28'
        rankWidth = 22;
      } else if (level === 16) {
        imagePath1 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_16.png`
        imagePath2 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_17.png`
        background = 'rgba(12, 186, 41, 0.404)'

        progressColor = '#0CBA28'
        rankWidth = 22;
      } else if (level === 17) {
        imagePath1 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_17.png`
        imagePath2 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_18.png`
        background = 'rgba(12, 186, 41, 0.404)'
        progressColor = '#0CBA28'
        rankWidth = 22;
      } else if (level === 18) {
        imagePath1 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_18.png`
        imagePath2 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_19.png`
        background = 'rgba(12, 186, 41, 0.404)'
        progressColor = '#0CBA28'
        rankWidth = 22;
      } else if (level === 19) {
        imagePath1 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_19.png`
        imagePath2 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_20.png`
        background = 'rgba(12, 186, 41, 0.404)'
        progressColor = '#0CBA28'
        rankWidth = 22;
      } else if (level === 20) {
        imagePath1 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_20.png`
        imagePath2 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_21.png`
        background = 'rgba(79, 91, 142, 0.363)'
        progressColor = '#4f5b8e'
      } else if (level === 21) {
        imagePath1 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_21.png`
        imagePath2 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_22.png`
        background = 'rgba(79, 91, 142, 0.363)'
        progressColor = '#4f5b8e'
      } else if (level === 22) {
        imagePath1 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_22.png`
        imagePath2 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_23.png`
        background = 'rgba(79, 91, 142, 0.363)'
        progressColor = '#4f5b8e'
      } else if (level === 23) {
        imagePath1 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_23.png`
        imagePath2 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_24.png`
        background = 'rgba(79, 91, 142, 0.363)'
        progressColor = '#4f5b8e'
      } else if (level === 24) {
        imagePath1 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_24.png`
        imagePath2 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_25.png`
        background = 'rgba(79, 91, 142, 0.363)'
        progressColor = '#4f5b8e'
      } else if (level === 25) {
        imagePath1 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_25.png`
        imagePath2 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_26.png`
        background = 'rgba(79, 91, 142, 0.363)'
        progressColor = '#4f5b8e'
      } else if (level === 26) {
        imagePath1 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_26.png`
        imagePath2 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_27.png`
        background = 'rgba(79, 91, 142, 0.363)'
        progressColor = '#4f5b8e'
      } else if (level === 27) {
        imagePath1 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_27.png`
        imagePath2 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_28.png`
        background = 'rgba(79, 91, 142, 0.363)'
        progressColor = '#4f5b8e'
      } else if (level === 28) {
        imagePath1 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_28.png`
        imagePath2 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_29.png`
        background = 'rgba(79, 91, 142, 0.363)'
        progressColor = '#4f5b8e'
      } else if (level === 29) {
        imagePath1 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_29.png`
        imagePath2 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_30.png`
        background = 'rgba(79, 91, 142, 0.363)'
        progressColor = '#4f5b8e'
      } else if (level === 30) {
        imagePath1 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_30.png`
        imagePath2 = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_30.png`
        background = 'rgba(79, 91, 142, 0.363)'
        progressColor = '#4f5b8e'
      }

      return (
        <>
        <img src={imagePath1} />
        <ProgressBar
              className="glowing-progress-bar"
              baseBgColor={background}
              margin="5px 0px 0px 0px"
              transitionTimingFunction="ease-in-out"
              bgColor={progressColor}
              height="5px"
              width="100%"
              borderRadius="2px"
              isLabelVisible={false}
              completed={rankProgress}
              maxCompleted={100} 
        />
        <img src={imagePath2} />
        </>
      )
}

export default Ranking