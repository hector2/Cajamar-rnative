import React from "react";

import { Card, CardItem, Icon, Right, Text } from "native-base";
import { Image } from "react-native";
import { format } from "date-fns";
import { theme } from "./ThemeVariables";

interface TransactionEntity {
  name: string;
  uri: string;
  beautyName: string;
}

const namesResolver: TransactionEntity[] = [
  {
    name: "MERCADONA",
    uri:
      "https://pbs.twimg.com/profile_images/899390660440199169/reHRnc5T_400x400.jpg",
    beautyName: "Mercadona"
  },
  {
    name: "AMZN",
    uri:
      "http://g-ec2.images-amazon.com/images/G/01/social/api-share/amazon_logo_500500.png",
    beautyName: "Amazon"
  },
  {
    name: "CAJAMAR",
    uri:
      "https://www.sanroque.es/sites/default/files//styles/medium-large470/public/imag_direccion/2017/06/29/cajamar.png?itok=-5wTdVjZ",
    beautyName: "Cajamar"
  },
  {
    name: "CARGO PAGO INMEDIATO",
    uri:
      "https://www.vectorlogo.es/wp-content/uploads/2019/05/logo-vector-bizum.jpg",
    beautyName: "Bizum"
  },
  {
    name: "JUST-EAT",
    uri:
      "https://d2egcvq7li5bpq.cloudfront.net/all/frontend/just-eat-logo-facebook-v3.png",
    beautyName: "JUST EAT"
  },
  {
    name: "LIDL",
    uri: "http://www.mendips.net/uploads/Proyectos/Lidl/Logo_LIDL_JPEG.jpg",
    beautyName: "Lidl"
  },
  {
    name: "YOIGO",
    uri:
      "https://www.phonehouse.es/img/logos/logos-operadores-circulo-yoigo.png",
    beautyName: "Yoigo"
  },
  {
    name: "PAYPAL",
    uri:
      "https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg",
    beautyName: "Paypal"
  },
  {
    name: "NOMINA",
    uri:
      "http://sageone-spain-wordpress.s3.amazonaws.com/images/Agosto2014/nominas-o-facturas-como-cobro-de-mi-empresa.jpg",
    beautyName: "Nómina"
  },
  {
    name: "TRANSF.",
    uri:
      "http://revistalatribuna.com/wp-content/uploads/2018/10/transferencia.jpg",
    beautyName: "Transferencia"
  },
  {
    name: "COMERCIO",
    uri:
      "https://png.pngtree.com/png_detail/18/09/10/pngtree-red-shopping-cart-png-clipart_739601.jpg",
    beautyName: "Compras en comercios"
  }
];

export interface IMovement {
  id: string;
  date: Date;
  concept: string;
  amount: number;
}

interface MovementProps {
  mov: IMovement;
}

function resolveTransactionEntity(st: string) {
  for (let name of namesResolver) {
    if (st.includes(name.name)) {
      return name;
    }
  }

  return {
    name: "Desconocido",
    uri:
      "http://revistalatribuna.com/wp-content/uploads/2018/10/transferencia.jpg",
    beautyName: "Desconocido"
  };
}

export default class Movement extends React.PureComponent<MovementProps, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    let color = "yellow";

    if (this.props.mov.amount > 0) {
      color = "green";
    } else if (this.props.mov.amount < 0) {
      color = "red";
    }

    let beautyEntity = resolveTransactionEntity(this.props.mov.concept);

    return (
      <Card
        style={{
          borderRadius: theme.radiusCard,
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Image
          resizeMode="contain"
          source={{ uri: beautyEntity.uri }}
          style={{
            height: 64,
            width: 64,
            margin: 10,

            borderRadius: theme.radiusCard,
            borderColor: "black",
            alignSelf: "stretch"
          }}
        />

        <CardItem
          style={{
            flex: 1,
            flexDirection: "column"
          }}
        >
          <Text>
            {beautyEntity.beautyName === "Desconocido"
              ? this.props.mov.concept
              : beautyEntity.beautyName}
          </Text>
          <Text style={{ color: color, fontWeight: "bold" }}>
            {this.props.mov.amount.toString() + "€"}
          </Text>
        </CardItem>

        <CardItem
          footer
          style={{
            flex: 1,
            flexDirection: "row",
            borderTopRightRadius: theme.radiusCard,
            borderBottomRightRadius: theme.radiusCard
          }}
        >
          <Icon fontSize={32} name="md-calendar" style={{ color: "gray" }} />
          <Text style={{ color: "gray" }}>
            {format(this.props.mov.date, "DD/MM")}
          </Text>
        </CardItem>
      </Card>
    );
  }
}
