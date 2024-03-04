import "@stdlib/deploy";

contract SendAndReceive with Deployable {
    counter: Int as uint32;

    init() {
        self.counter = 0;
    }
    receive('inc'){
        self.counter += 1;
    }
    get fun counter(): Int {
        return self.counter
    }
}
