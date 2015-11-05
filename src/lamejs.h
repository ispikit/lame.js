#ifndef _LAMEJS_H_
#define _LAMEJS_H_

#include <emscripten/bind.h>
#include "lame.h"

namespace lamejs {

  typedef std::vector<int16_t> AudioBuffer;
  typedef std::vector<unsigned char> MP3Buffer;

  enum ReturnType {
    SUCCESS,
    BAD_STATE,
    BAD_ARGUMENT,
    RUNTIME_ERROR
  };

  class Encoder {
  public:
    Encoder();
    ReturnType Start();
    ReturnType Stop(MP3Buffer&);
    ReturnType Encode(const AudioBuffer&, MP3Buffer&);
    ~Encoder();
  private:
    lame_t lame;
    bool is_initialized;
    bool is_encoding;
    unsigned char * buffer; 
  };

} // namespace lamejs

namespace la = lamejs;
EMSCRIPTEN_BINDINGS(recognizer) {

  emscripten::enum_<la::ReturnType>("ReturnType")
    .value("SUCCESS", la::SUCCESS)
    .value("BAD_STATE", la::BAD_STATE)
    .value("BAD_ARGUMENT", la::BAD_ARGUMENT)
    .value("RUNTIME_ERROR", la::RUNTIME_ERROR);

  emscripten::register_vector<int16_t>("AudioBuffer");
  emscripten::register_vector<unsigned char>("MP3Buffer");

  emscripten::class_<la::Encoder>("Encoder")
    .constructor<>()
    .function("Start", &la::Encoder::Start)
    .function("Stop", &la::Encoder::Stop)
    .function("Encode", &la::Encoder::Encode);
}

#endif /* _LAMEJS_H_ */
