# pylint: disable=protected-access
"""Shared typing definition."""
import ctypes # provides C compatible data types, and allows calling functions in DLLs or shared libraries
import os
from typing import (
    TYPE_CHECKING,
    Any,
    Callable,
    Dict,
    List,
    Sequence,
    Type,
    TypeVar,
    Union,
)

# os.PathLike/string/numpy.array/scipy.sparse/pd.DataFrame/dt.Frame/
# cudf.DataFrame/cupy.array/dlpack
import numpy as np

DataType = Any

# xgboost accepts some other possible types in practice due to historical reason, which is
# lesser tested.  For now we encourage users to pass a simple list of string.
FeatureInfo = Sequence[str]
FeatureNames = FeatureInfo
FeatureTypes = FeatureInfo
BoosterParam = Union[List, Dict[str, Any]]  # better be sequence

ArrayLike = Any
PathLike = Union[str, os.PathLike]
CupyT = ArrayLike  # maybe need a stub for cupy arrays
NumpyOrCupy = Any
NumpyDType = Union[str, Type[np.number]]
PandasDType = Any  # real type is pandas.core.dtypes.base.ExtensionDtype

FloatCompatible = Union[float, np.float32, np.float64]

# callables
FPreProcCallable = Callable

# ctypes
# c_bst_ulong corresponds to bst_ulong defined in xgboost/c_api.h
c_bst_ulong = ctypes.c_uint64  # pylint: disable=C0103

ModelIn = Union[str, bytearray, os.PathLike]

CTypeT = TypeVar(
    "CTypeT",
    ctypes.c_void_p,
    ctypes.c_char_p,
    ctypes.c_int,
    ctypes.c_float,
    ctypes.c_uint,
    ctypes.c_size_t,
)

# supported numeric types
CNumeric = Union[
    ctypes.c_float,
    ctypes.c_double,
    ctypes.c_uint,
    ctypes.c_uint64,
    ctypes.c_int32,
    ctypes.c_int64,
]

# c pointer types
if TYPE_CHECKING:
    CStrPtr = ctypes._Pointer[ctypes.c_char]

    CStrPptr = ctypes._Pointer[ctypes.c_char_p]

    CFloatPtr = ctypes._Pointer[ctypes.c_float]

    CNumericPtr = Union[
        ctypes._Pointer[ctypes.c_float],
        ctypes._Pointer[ctypes.c_double],
        ctypes._Pointer[ctypes.c_uint],
        ctypes._Pointer[ctypes.c_uint64],
        ctypes._Pointer[ctypes.c_int32],
        ctypes._Pointer[ctypes.c_int64],
    ]
else:
    CStrPtr = ctypes._Pointer

    CStrPptr = ctypes._Pointer

    CFloatPtr = ctypes._Pointer

    CNumericPtr = Union[
        ctypes._Pointer,
        ctypes._Pointer,
        ctypes._Pointer,
        ctypes._Pointer,
        ctypes._Pointer,
        ctypes._Pointer,
    ]

# template parameter
_T = TypeVar("_T")
_F = TypeVar("_F", bound=Callable[..., Any])
