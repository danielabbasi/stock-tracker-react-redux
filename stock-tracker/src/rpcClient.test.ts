import { createRpcClient, RpcClient } from "Test";

describe("testing rpc client", () => {
  jest.mock("uuid/v4");
  let socket: Pick<SocketIOClient.Socket, "on" | "off" | "emit">;
  let emit: jest.Mock;
  let on: jest.Mock;
  let off: jest.Mock;
  let testUUID: jest.Mock;
  let rpcClient: RpcClient;

  beforeEach(() => {
    emit = jest.fn();
    on = jest.fn();
    off = jest.fn();
    socket = { emit, on, off };
    testUUID = jest.fn(() => "testUUID");
    rpcClient = createRpcClient(socket, testUUID);
    jest.useFakeTimers();
  });

  it("should create an rpc client", () => {
    expect(typeof rpcClient).toBe("function");
  });

  describe("when making an RPC", () => {
    let promise: Promise<string>;

    beforeEach(() => {
      promise = rpcClient("TOPIC", "ARG1");
    });

    it("should create the correct uuid using topic name", () => {
      expect(on.mock.calls[0][0]).toBe("TOPICtestUUID");
    });

    it("should emit correct topic, uuid channel and arguements", () => {
      expect(emit).toHaveBeenCalledWith("TOPIC", "TOPICtestUUID", "ARG1");
    });

    it("should call socket.off with the correct channel (topic + uuid)", () => {
      on.mock.calls[0][1]({ isError: false, payload: "data" });
      expect(off.mock.calls[0][0]).toBe("TOPICtestUUID");
    });

    it("should resolve the promise with correct data", () => {
      on.mock.calls[0][1]({ isError: false, data: "data" });
      return expect(promise).resolves.toBe("data");
    });

    it("should reject the promise with isError being true", () => {
      on.mock.calls[0][1]({ isError: true });
      return expect(promise).rejects.toBe(true);
    });

    it("should run a setTimeout for 5 seconds", () => {
      jest.runAllTimers();
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 5000);
    });

    it("should reject promise after 5 seconds", () => {
      jest.runAllTimers();
      expect(promise).rejects.toBe("Promise took too long");
    });
  });
});
