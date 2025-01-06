const Image = ({ src, alt, className }) => {
  // eslint-disable-next-line @next/next/no-img-element
  return (<img src={src} alt={alt} className={className} />)
}

export default Image;
