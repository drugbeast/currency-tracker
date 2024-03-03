import AustralianDollar from 'Assets/images/australianDollar.svg'
import Bitcoin from 'Assets/images/bitcoin.svg'
import CanadianDollar from 'Assets/images/canadianDollar.svg'
import Dollar from 'Assets/images/dollar.svg'
import Euro from 'Assets/images/euro.svg'
import Libra from 'Assets/images/libra.svg'
import PesoArgentino from 'Assets/images/pesoArgentino.svg'
import Won from 'Assets/images/won.svg'
import Yen from 'Assets/images/yen.svg'

const icons = {
  AUD: (props) => <AustralianDollar {...props} />,
  BTC: (props) => <Bitcoin {...props} />,
  CAD: (props) => <CanadianDollar {...props} />,
  USD: (props) => <Dollar {...props} />,
  EUR: (props) => <Euro {...props} />,
  TRY: (props) => <Libra {...props} />,
  ARS: (props) => <PesoArgentino {...props} />,
  KRW: (props) => <Won {...props} />,
  JPY: (props) => <Yen {...props} />,
}

export default icons
