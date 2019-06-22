import React from "react";

import { Card, CardItem, Icon, Right, Text } from "native-base";
import { Image } from "react-native";
import { format } from "date-fns";

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
    let iconName = "trending-neutral";
    let color = "yellow";

    if (this.props.mov.amount > 0) {
      iconName = "trending-up";
      color = "green";
    } else if (this.props.mov.amount < 0) {
      iconName = "trending-down";
      color = "red";
    }

    let radius = 30;

    /*
    let beautyName = this.props.mov.concept;

    if (this.props.mov.concept.split("******").length == 2) {
      beautyName = this.props.mov.concept.split("******")[1];
    }*/

    let beautyEntity = resolveTransactionEntity(this.props.mov.concept);

    return (
      <Card
        style={{
          borderRadius: radius,
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

            borderRadius: radius,
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
            borderTopRightRadius: radius,
            borderBottomRightRadius: radius
          }}
        >
          <Icon fontSize={32} name="md-calendar" style={{ fontColor: "red" }} />
          <Text style={{ color: "red" }}>
            {format(this.props.mov.date, "DD/MM")}
          </Text>
        </CardItem>
      </Card>
    );
  }
}
