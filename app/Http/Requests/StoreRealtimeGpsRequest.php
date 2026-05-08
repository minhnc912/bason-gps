<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreRealtimeGpsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [

            'unit_id' => ['required', 'string'],

            'latitude' => ['required', 'numeric'],

            'longitude' => ['required', 'numeric'],

            'power_status' => ['required', 'boolean'],

            'temperature' => ['nullable', 'numeric'],

            'tool_watch' => ['nullable', 'string'],

            'firmware_version' => ['nullable', 'string'],
        ];
    }
}
