# Functional Domain model
In domain, a directory consists of command handlers.
Analog to OOP style, a directory itself would be an object and files in it would be its methods.

Every command handler has a signature:

`(history, command) => events`

Where history is an array of events used for cacluating state.
This is done with a `projection` which is defined with a following signature:

`(state, event) => state`

