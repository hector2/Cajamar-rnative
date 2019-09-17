import { IMovement } from "./components/Movement";
import { isBefore } from "date-fns";
import { IBalance } from "./components/Balance";
import { UNAUTHORIZED, INTERNAL_ERROR, UPDATED_KEY } from "./Constants";
import AsyncStorage from "@react-native-community/async-storage";

export function getImportantMovements(coll: IMovement[]) {
  let masBeneficiosos = coll
    .filter(mov => mov.amount > 0)
    .sort((a, b) => b.amount - a.amount);

  if (masBeneficiosos.length > 1) {
    masBeneficiosos = masBeneficiosos.slice(0, 1);
  }

  let masMalos = coll
    .filter(mov => mov.amount < 0)
    .sort((a, b) => a.amount - b.amount);

  if (masMalos.length > 1) {
    masMalos = masMalos.slice(0, 1);
  }

  console.log("masbeneficiosos");
  console.log(masBeneficiosos);

  console.log("masmalos");
  console.log(masMalos);

  if (masBeneficiosos.length > 0 && masMalos.length === 0) {
    return masBeneficiosos[0];
  } else if (masMalos.length > 0 && masBeneficiosos.length === 0) {
    return masMalos[0];
  } else if (masMalos.length > 0 && masBeneficiosos.length > 0) {
    let masBien = masBeneficiosos[0];
    let masMal = masMalos[0];
    return isBefore(masBien.date, masMal.date) ? masBien : masMal;
  } else {
    throw "No movements";
  }
}

export function calculateBalance(coll: IMovement[], from: Date, to: Date): IBalance {
  let positivo = 0.0;
  let negativo = 0.0;

  for (let mov of coll) {
    let value = mov.amount;
    if (value >= 0) {
      positivo += value;
      positivo = +positivo.toFixed(2);
    } else {
      negativo += value;
      negativo = +negativo.toFixed(2);
    }
  }

  return {
    positive: positivo,
    negative: negativo,
    total: +(positivo + negativo).toFixed(2),
    from: from,
    to: to
  };
}

export function filterMovementsRange(mostImportant: IMovement, movements: IMovement[]) {
    let index = movements.indexOf(mostImportant);
    if (index < movements.length - 1 && index !== -1) {
        movements = movements.slice(0, index + 1);
    }
}

export async function getFreshMovements(
  since: Date,
  username: string,
  password: string
) {
  const movements: IMovement[] = [];
  let response = await fetch(
    "https://xwhzp8zwv9.execute-api.eu-west-3.amazonaws.com/dev/scrap",
    {
      method: "POST",
      body: JSON.stringify({ username: username, password: password }), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
  let responseJson = await response.json();

  if (responseJson.statusCode === UNAUTHORIZED) {
    throw UNAUTHORIZED;
  } else if (responseJson.statusCode === INTERNAL_ERROR) {
    throw INTERNAL_ERROR;
  }

  console.log("since", since);

  responseJson = responseJson.content;

  for (let mov of responseJson) {
    let parts = mov.date.split("/");
    let fechamov = new Date(
      parseInt(parts[2]),
      parseInt(parts[1]) - 1,
      parseInt(parts[0]) + 1
    );

    fechamov.setHours(0);
    fechamov.setMinutes(0);
    fechamov.setSeconds(0);
    fechamov.setMilliseconds(0);

    if (isBefore(since, fechamov)) {
      let movement: IMovement = {
        id: mov.id,
        date: fechamov,
        concept: mov.concept,
        amount: mov.amount
      };
      movements.push(movement);
    }
  }

  return movements;
}


export async function getStoredMovements() {
    let movements: IMovement[] = []
    let movKeys = await AsyncStorage.getAllKeys()
    movKeys = movKeys.filter((v) => v !== UPDATED_KEY)
  
    console.log("claves", movKeys)
  
    let keyvalues = await AsyncStorage.multiGet(movKeys)
  
    console.log("keyvalues", keyvalues)
  
    keyvalues.map((v) => v[1]).forEach((v) => {
      let parsed = JSON.parse(v)
  
      console.log("compare parsed and final", parsed.date, new Date(parsed.date))
  
      let mov: IMovement = {
        id: parsed.id,
        date: new Date(parsed.date),
        concept: parsed.concept,
        amount: parsed.amount
      }
      movements.push(mov)
    })
  
    console.log("movements offline", movements)
  
    movements = movements.sort((a, b) => b.date.getTime() - a.date.getTime())
  
    console.log("movements sorted", movements)
  
    return movements
  }