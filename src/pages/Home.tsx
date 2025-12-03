import {
  AvatarsList,
  CardComponent,
  CustomChart,
  CustomTable,
  Header,
} from '@/components'
import { Container } from '@mui/material'
import { currencyConverter } from '@/utils'

function Home() {
  const mockListData = [
    {
      avatar: '/dnc-avatar.svg',
      name: 'Nome Sobrenome 1 ',
      subtitle: currencyConverter(4214.41),
    },
    {
      avatar: '/dnc-avatar.svg',
      name: 'Nome Sobrenome 2 ',
      subtitle: currencyConverter(4338.67),
    },
    {
      avatar: '/dnc-avatar.svg',
      name: 'Nome Sobrenome 3 ',
      subtitle: currencyConverter(2265.52),
    },
  ]

  const mockTableData = {
    headers: ['Name', 'Email', 'Actions'],
    rows: [
      [
        <span>Nome 1</span>,
        <span>nome1@email.com</span>,
        <button>Action</button>,
      ],
      [
        <span>Nome 2</span>,
        <span>nome2@email.com</span>,
        <button>Action</button>,
      ],
      [
        <span>Nome 3</span>,
        <span>nome3@email.com</span>,
        <button>Action</button>,
      ],
    ],
  }
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <CardComponent>Card</CardComponent>
        <CardComponent>
          <AvatarsList listData={mockListData} />
        </CardComponent>
        <CardComponent>
          <CustomTable
            headers={mockTableData.headers}
            rows={mockTableData.rows}
          />
        </CardComponent>
        <CardComponent>
          <CustomChart
            labels={['Jan', 'Fev', 'Mar', 'Abr', 'Mai']}
            data={[1000.12, 456.54, 986.32, 654.89, 754.89, 354.89]}
            type="bar"
          />
        </CardComponent>
      </Container>
    </>
  )
}

export default Home
