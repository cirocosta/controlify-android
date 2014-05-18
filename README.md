# Controlify ANDROID!

> Expands your experience :neckbeard:

## Desktop Application

Sets up a server which lets android devices interact with the main game/activity. It listens to what is comming to it and then transports data to the proper place.

## Android

The device is meant to be an object, which is made of : Name, Sensors and Controls.

|          |                        Description                        |
| -------- | --------------------------------------------------------- |
| Name     | Whats describes the device. May be only the model if      |
|          | nothing is passed to it.                                  |
| sensors  | The logic of the accelerometer, if this is the chosen one |
| Controls | The buttons which lets the user expands its interaction.  |


### Main Loop

Deve haver em uma thread um loop principal emitindo eventos de X em X ms. Para cada iterada dentro deste loop deve-se obter as informações do device (infos de sensores e botões) e então executar algum callback passado pela interface. A classe `MyDevice` portanto tratar-se-á apenas de uma representação do estado do aparelho.


## Considerations

At this time this implementation is REALLY laggy for a real application. We are wasting a bunch of time parsing/constructing these JSON objects and sending over to *socket.io*. This is all about conception :grin:
