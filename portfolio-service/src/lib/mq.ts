import * as amqp from "amqplib";
import { env } from "bun";

export const URL = Bun.env.AMQP_URL
export let connection: amqp.Connection | undefined;

export async function amqpConnect(url: string): Promise<amqp.Connection> {
  if (!connection) {
    connection = await amqp.connect(url)
  }
  return connection
}

export async function amqpDisconnect() {
  await connection?.close();
  connection = undefined;
}