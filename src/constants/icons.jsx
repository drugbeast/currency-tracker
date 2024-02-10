import AustralianDollar from '../assets/images/australianDollar.svg'
import Bitcoin from '../assets/images/bitcoin.svg'
import CanadianDollar from '../assets/images/canadianDollar.svg'
import Dollar from '../assets/images/dollar.svg'
import Euro from '../assets/images/euro.svg'
import Libra from '../assets/images/libra.svg'
import PesoArgentino from '../assets/images/pesoArgentino.svg'
import Won from '../assets/images/won.svg'
import Yen from '../assets/images/yen.svg'

const icons = {
  AUD: props => <AustralianDollar {...props} />,
  BTC: props => <Bitcoin {...props} />,
  CAD: props => <CanadianDollar {...props} />,
  USD: props => <Dollar {...props} />,
  EUR: props => <Euro {...props} />,
  TRY: props => <Libra {...props} />,
  ARS: props => <PesoArgentino {...props} />,
  KRW: props => <Won {...props} />,
  JPY: props => <Yen {...props} />,
}

export default icons
