export type Action<Type> = {
  type: Type;
};

export type ActionWithPayload<Type, Payload> = Action<Type> & {
  payload: Payload;
};
