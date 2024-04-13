
const RankingStyle = (sender_rank) => {
  let imagePath, background, progressColor, rankWidth, rankHeight;

  // Set styling data
  if (sender_rank === 0) {
    imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH  }/unranked.png`
    background = 'rgba(79, 91, 142, 0.363)'
    progressColor = '#4f5b8e'
    rankWidth = 18
  } else if (sender_rank === 1) {
    imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH  }/rank_1.png`
    background = 'rgba(79, 91, 142, 0.363)'
    progressColor = '#4f5b8e'
    rankWidth = 20
  } else if (sender_rank === 2) {
    imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH  }/rank_2.png`
    background = 'rgba(79, 91, 142, 0.363)'
    progressColor = '#4f5b8e'
    rankWidth = 28
  } else if (sender_rank === 3) {
    imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH  }/rank_3.png`
    background = 'rgba(79, 91, 142, 0.363)'
    progressColor = '#4f5b8e'
    rankWidth = 28
  } else if (sender_rank === 4) {
    imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH  }/rank_4.png`
    background = 'rgba(79, 91, 142, 0.363)'
    progressColor = '#4f5b8e'
    rankWidth = 28
  } else if (sender_rank === 5) {
    imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH  }/rank_5.png`
    background = 'rgba(79, 91, 142, 0.363)'
    progressColor = '#4f5b8e'
    rankWidth = 28
  } else if (sender_rank === 6) {
    imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH  }/rank_6.png`
    background = 'rgba(244, 147, 43, 0.445)'
    progressColor = '#F4932B'
    rankWidth = 20
  } else if (sender_rank === 7) {
    imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH  }/rank_7.png`
    background = 'rgba(244, 147, 43, 0.445)'
    progressColor = '#F4932B'
    rankWidth = 28
  } else if (sender_rank === 8) {
    imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH  }/rank_8.png`
    background = 'rgba(244, 147, 43, 0.445)'
    progressColor = '#F4932B'
    rankWidth = 28
  } else if (sender_rank === 9) {
    imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH  }/rank_9.png`
    background = 'rgba(244, 147, 43, 0.445)'
    progressColor = '#F4932B'
    rankWidth = 28
  } else if (sender_rank === 10) {
    imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH  }/rank_10.png`
    background = 'rgba(244, 147, 43, 0.445)'
    progressColor = '#F4932B'
    rankWidth = 24
  } else if (sender_rank === 11) {
    imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH  }/rank_11.png`
    background = 'rgba(12, 186, 41, 0.404)'
    progressColor = '#0CBA28'
    rankWidth = 24
  } else if (sender_rank === 12) {
    imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH  }/rank_12.png`
    background = 'rgba(12, 186, 41, 0.404)'
    progressColor = '#0CBA28'
    rankWidth = 24
  } else if (sender_rank === 13) {
    imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH  }/rank_13.png`
    background = 'rgba(54, 155, 255, 0.432)'
    progressColor = '#369CFF'
    rankWidth = 22
  } else if (sender_rank === 14) {
    imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH  }/rank_14.png`
    background = 'rgba(54, 155, 255, 0.432)'
    progressColor = '#369CFF'
    rankWidth = 22
  } else if (sender_rank === 15) {
    imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH  }/rank_15.png`
    background = 'rgba(12, 186, 41, 0.404)'
    progressColor = '#0CBA28'
    rankWidth = 22
  } else if (sender_rank === 16) {
    imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH  }/rank_16.png`
    background = 'rgba(12, 186, 41, 0.404)'
    progressColor = '#0CBA28'
    rankWidth = 22
  } else if (sender_rank === 17) {
    imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH  }/rank_17.png`
    background = 'rgba(12, 186, 41, 0.404)'
    progressColor = '#0CBA28'
    rankWidth = 22
  } else if (sender_rank === 18) {
    imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH  }/rank_18.png`
    background = 'rgba(12, 186, 41, 0.404)'
    progressColor = '#0CBA28'
    rankWidth = 22
  } else if (sender_rank === 19) {
    imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH  }/rank_19.png`
    background = 'rgba(12, 186, 41, 0.404)'
    progressColor = '#0CBA28'
    rankWidth = 22
  } else if (sender_rank === 20) {
    imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH  }/unranked.png`
    background = 'rgba(79, 91, 142, 0.363)'
    progressColor = '#4f5b8e'
  } else if (sender_rank === 21) {
    imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH  }/unranked.png`
    background = 'rgba(79, 91, 142, 0.363)'
    progressColor = '#4f5b8e'
  } else if (sender_rank === 22) {
    imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH  }/unranked.png`
    background = 'rgba(79, 91, 142, 0.363)'
    progressColor = '#4f5b8e'
  } else if (sender_rank === 23) {
    imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH  }/unranked.png`
    background = 'rgba(79, 91, 142, 0.363)'
    progressColor = '#4f5b8e'
  } else if (sender_rank === 24) {
    imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH  }/unranked.png`
    background = 'rgba(79, 91, 142, 0.363)'
    progressColor = '#4f5b8e'
  } else if (sender_rank === 25) {
    imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH  }/unranked.png`
    background = 'rgba(79, 91, 142, 0.363)'
    progressColor = '#4f5b8e'
  } else if (sender_rank === 26) {
    imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH  }/unranked.png`
    background = 'rgba(79, 91, 142, 0.363)'
    progressColor = '#4f5b8e'
  } else if (sender_rank === 27) {
    imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH  }/unranked.png`
    background = 'rgba(79, 91, 142, 0.363)'
    progressColor = '#4f5b8e'
  } else if (sender_rank === 28) {
    imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH  }/unranked.png`
    background = 'rgba(79, 91, 142, 0.363)'
    progressColor = '#4f5b8e'
  } else if (sender_rank === 29) {
    imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH  }/unranked.png`
    background = 'rgba(79, 91, 142, 0.363)'
    progressColor = '#4f5b8e'
  } else if (sender_rank === 30) {
    imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH  }/unranked.png`
    background = 'rgba(79, 91, 142, 0.363)'
    progressColor = '#4f5b8e'
  }

  // Return the styling values as an object
  return { imagePath, background, progressColor, rankWidth };
}

export default RankingStyle;
