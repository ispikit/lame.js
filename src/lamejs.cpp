#include "lame.h"
#include "lamejs.h"
/*
#include <algorithm>
#include <iostream>
*/
#define MAX_OUTPUT_BUFFER_LENGTH 64000

namespace lamejs {

  Encoder::Encoder() : is_initialized(false), is_encoding(false) {
    buffer = new unsigned char[MAX_OUTPUT_BUFFER_LENGTH];
    lame = lame_init();
    lame_set_in_samplerate(lame, 16000);
    lame_set_VBR(lame, vbr_default);
    lame_set_bWriteVbrTag(lame, 0);
    if (lame_init_params(lame) == 0)
      is_initialized = true;
  }

  ReturnType Encoder::Start() {
    if (is_initialized) {
      is_encoding = true;
      return SUCCESS;
    }
    return BAD_STATE;
  }

  ReturnType Encoder::Stop(MP3Buffer& mp3Buffer) {
    if (is_encoding) {
      mp3Buffer.clear();
      int num_samples = lame_encode_flush(lame, buffer,
					  MAX_OUTPUT_BUFFER_LENGTH);
      for (int i = 0 ; i < num_samples ; i++)
	mp3Buffer.push_back(buffer[i]);
      if (num_samples >= 0) {
	is_encoding = false;
	return SUCCESS;
      } else
	return BAD_STATE;
    }
    return RUNTIME_ERROR;
  }
  
  ReturnType Encoder::Encode(const AudioBuffer& audioBuffer, MP3Buffer& mp3Buffer) {
    if (is_encoding) {
      mp3Buffer.clear();
      int num_samples = lame_encode_buffer(lame, audioBuffer.data(),
					   audioBuffer.data(), audioBuffer.size(),
					   buffer, MAX_OUTPUT_BUFFER_LENGTH);
      for(int i = 0 ; i < num_samples ; i++)
	mp3Buffer.push_back(buffer[i]);
      if (num_samples >= 0) {
	return SUCCESS;
      }
    } else
      return BAD_STATE;
    return RUNTIME_ERROR;
  }

  Encoder::~Encoder() {
    delete [] buffer;
    if (is_initialized)
      lame_close(lame);
  }
  
} // namespace lamejs
