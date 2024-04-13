import { Svg, SvgProps } from '@kazamaswap/uikit'

const RibbonDownSide: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <Svg viewBox="0 0 32 64" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.5013 64C4.65815 64 -0.670819 58.0604 0.0686475 51.2573C0.423944 47.9886 2.12624 45.1636 4.58664 43.3108C5.51702 42.6101 6.24525 41.6322 6.40046 40.4779C6.56956 39.2203 6.02972 37.9944 5.19007 37.043C3.15098 34.7325 2.04171 31.6093 2.38086 28.2932C2.97882 22.4464 7.90322 18 13.7805 18H18.4336V64H11.5013Z"
        fill="#3B2070"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.5013 62C4.65815 62 -0.670819 56.0604 0.0686475 49.2573C0.423944 45.9886 2.12624 43.1636 4.58664 41.3108C5.51702 40.6101 6.24525 39.6322 6.40046 38.4779C6.56956 37.2203 6.02972 35.9944 5.19007 35.043C3.15098 32.7325 2.04171 29.6093 2.38086 26.2932C2.97882 20.4464 7.90322 16 13.7805 16H28V62H11.5013Z"
        fill="#5E38AA"
      />
      <path d="M16.0151 17.7998C14.9409 8.31101 22.4506 0 32 0V46L20 53L16.0151 17.7998Z" fill="#7645D9" />
      <path
        d="M25 46C22.2386 46 20 48.2386 20 51C20 53.7614 22.2386 56 25 56H26C27 56 30 57 30 59V56C30 49.5 28 46 28 46H25Z"
        fill="#4E2F8C"
      />
      <path fillRule="evenodd" clipRule="evenodd" d="M27 46H20V53C20 49.134 23.134 46 27 46Z" fill="#7645D9" />
      <path
        d="M27 46C23.134 46 20 49.134 20 53C20 55.7614 22.2386 58 25 58H27C27.5523 58 28 58.4477 28 59C28 60.6569 26.6569 62 25 62H18V64H25C27.7614 64 30 61.7614 30 59C30 57.3431 28.6569 56 27 56H25C23.3431 56 22 54.6569 22 53C22 50.2386 24.2386 48 27 48H32V46H27Z"
        fill="#3B2070"
      />
    </Svg>
  )
}

export default RibbonDownSide
